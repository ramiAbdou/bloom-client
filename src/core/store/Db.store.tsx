/**
 * @fileoverview DB Store
 * - Acts a client-side DB in which normalized entities live.
 */

import { Action, action, Computed, computed } from 'easy-peasy';
import Cookie from 'js-cookie';
import mergeWith from 'lodash.mergewith';
import { Schema } from 'normalizr';

import { parseEntities } from '@util/util';
import {
  EntityRecord,
  ICommunity,
  IEntities,
  IIntegrations,
  IMember,
  initialEntities,
  IQuestion,
  IUser
} from './entities';

/**
 * Returns a 3-tuple represents the R-G-B colors from a hexadecimal color.
 *
 * @param hex Hexadecimal color.
 * @see https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
 */
const getRGBFromHex = (hex: string): number[] =>
  hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`
    )
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16));

/**
 * Returns the hue from an RGB 3-tuple.
 */
const getHueFromRGB = ([r, g, b]: number[]): number => {
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  if (max === min) return 0;

  let hue = (max + min) / 2;
  const diff = max - min;

  if (max === r) hue = (g - b) / diff;
  if (max === g) hue = (b - r) / diff + 2;
  if (max === b) hue = (r - g) / diff + 4;

  hue *= 60;

  return hue < 0 ? hue + 360 : Math.round(hue);
};

type UpdateEntitiesArgs = {
  ids: string[];
  entityName: 'communities' | 'members' | 'questions' | 'users';
  updatedData?: Partial<ICommunity | IMember | IQuestion | IUser>;
};

type MergeEntitiesArgs = {
  communityReferenceColumn?: string;
  data?: any;
  schema?: Schema<any>;
  setActiveId?: boolean;
};

export type DbModel = {
  clearEntities: Action<DbModel>;
  community: Computed<DbModel, ICommunity>;
  entities: IEntities;
  integrations: Computed<DbModel, IIntegrations>;
  isOwner: Computed<DbModel, boolean>;
  member: Computed<DbModel, IMember>;
  mergeEntities: Action<DbModel, MergeEntitiesArgs>;
  updateCommunity: Action<DbModel, Partial<ICommunity>>;
  updateEntities: Action<DbModel, UpdateEntitiesArgs>;
  user: Computed<DbModel, IUser>;
};

export const dbModel: DbModel = {
  clearEntities: action((state) => ({ ...state, entities: initialEntities })),

  community: computed(({ entities }) => {
    const { activeId, byId } = entities.communities;
    const result: ICommunity = byId[activeId];

    if (!result) return null;

    // For every request, we should have a communityId set in the token so
    // we could take advantage of the GQL context and reduce # of args.
    if (Cookie.get('communityId') !== activeId) {
      Cookie.set('communityId', activeId);
    }

    const color = result?.primaryColor ?? '#f58023';

    // If the document's primary color is up to date, return early.
    const { style } = document.documentElement;
    if (style.getPropertyValue('--primary') === color) return result;

    const RGB = getRGBFromHex(color);
    const hue = getHueFromRGB(RGB);

    style.setProperty('--primary', color);
    style.setProperty('--primary-hex', `${RGB[0]}, ${RGB[1]}, ${RGB[2]}`);
    style.setProperty('--primary-hue', `${hue}`);
    style.setProperty('--gray-1', `hsl(${hue}, 5%, 20%)`);
    style.setProperty('--gray-2', `hsl(${hue}, 5%, 31%)`);
    style.setProperty('--gray-3', `hsl(${hue}, 5%, 51%)`);
    style.setProperty('--gray-4', `hsl(${hue}, 5%, 74%)`);
    style.setProperty('--gray-5', `hsl(${hue}, 5%, 88%)`);
    style.setProperty('--gray-6', `hsl(${hue}, 5%, 96%)`);

    return result;
  }),

  entities: initialEntities,

  integrations: computed(({ entities }) => {
    const { activeId, byId: byCommunityId } = entities.communities;
    const { byId } = entities.integrations;
    return byId[byCommunityId[activeId]?.integrations];
  }),

  isOwner: computed(({ member }) => member?.role === 'OWNER'),

  member: computed(({ entities }) => {
    const { activeId, byId } = entities.members;
    const result = byId[activeId];

    if (result) {
      // For every request, we should have a communityId set in the token so
      // we could take advantage of the GQL context and reduce # of args.
      const { role } = result;
      if (Cookie.get('role') !== role) Cookie.set('role', role);
    }

    return result;
  }),

  /**
   * Main update function that updates all entities (front-end DB). Uses
   * the lodash deep merge function to make the updates.
   */
  mergeEntities: action(
    (
      { community, entities, ...state },
      { communityReferenceColumn, data, schema, setActiveId }: MergeEntitiesArgs
    ) => {
      const { byId: byCommunityId } = entities.communities;
      const parsedEntities = parseEntities(data, schema, setActiveId);

      // If there is a communityReferenceColumn, then not only should we
      // update the EntityRecord's with the updated/parsed data, we should
      // also add the references of those data entity ID's to the active
      // community.
      const updatedCommunities =
        !communityReferenceColumn || !community[communityReferenceColumn]
          ? {}
          : {
              communities: {
                ...entities.communities,
                byId: {
                  ...byCommunityId,
                  [community.id]: {
                    ...community,

                    // References are only stored as ID's, so we just append
                    // the new ID's to the existing reference ID's.
                    [communityReferenceColumn]: [
                      ...community[communityReferenceColumn],
                      ...parsedEntities[communityReferenceColumn].allIds
                    ]
                  }
                }
              } as EntityRecord<ICommunity>
            };

      // When there is a conflict in data, we have to resolve it.
      // Specifically in the cases of objects and arrays.
      // eslint-disable-next-line consistent-return
      const mergeStrategy = (target: any, source: any) => {
        if (Array.isArray(target) && Array.isArray(source)) {
          // Strip away all the duplicate values from the source array
          // that are already in the target array.
          const updatedSource = source.filter(
            (value: any) => !target.includes(value)
          );

          // Concat the source to the target.
          return target.concat(updatedSource);
        }

        // If two objects have the same ID, it means they are the same
        // entity, so we copy over the new values from the source to the
        // target.
        if (
          typeof target === 'object' &&
          typeof source === 'object' &&
          !!target?.id &&
          target?.id === source?.id
        ) {
          return { ...target, ...source };
        }
      };

      return {
        ...state,
        community,
        entities: mergeWith(
          { ...entities, ...updatedCommunities },
          parsedEntities,
          mergeStrategy
        ) as IEntities
      };
    }
  ),

  updateCommunity: action(
    ({ community, entities, ...state }, payload: Partial<ICommunity>) => {
      const { activeId, byId: byCommunityId } = entities.communities;

      return {
        ...state,
        community,
        entities: {
          ...entities,
          communities: {
            ...entities.communities,
            byId: {
              ...byCommunityId,
              [activeId]: { ...community, ...payload }
            }
          }
        }
      };
    }
  ),

  /**
   * Updates a specific entity, but does not change any reference values
   * as it's not needed.
   */
  updateEntities: action(
    (
      { entities, ...state },
      { entityName, ids, updatedData }: UpdateEntitiesArgs
    ) => {
      const { byId, allIds, activeId } = entities[entityName];

      const updatedById = ids.reduce((acc: Record<string, any>, id: string) => {
        return { ...acc, [id]: { ...byId[id], ...updatedData } };
      }, {});

      return {
        ...state,
        entities: {
          ...entities,
          [entityName]: { activeId, allIds, byId: { ...byId, ...updatedById } }
        }
      };
    }
  ),

  /**
   * There should only be one user queried in the application, and that is
   * the logged-in user.
   */
  user: computed(({ entities }) => {
    const { activeId, byId } = entities.users;
    return byId[activeId];
  })
};
