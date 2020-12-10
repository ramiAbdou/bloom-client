/**
 * @fileoverview Store
 * - Global store that manages the entire application's state. The entities
 * object as a normalized database for the React application. Most stores that
 * are defined in this global store are defined in the common components folder
 * (ie: PickerModel, ToastModel).
 */

import {
  Action,
  action,
  Computed,
  computed,
  createStore,
  createTypedHooks
} from 'easy-peasy';
import Cookie from 'js-cookie';
import mergeWith from 'lodash.mergewith';
import { Schema } from 'normalizr';

import { LoaderModel, loaderModel } from '@components/Loader/Loader.store';
import { ModalModel, modalModel } from '@components/Modal/Modal.store';
import { PickerModel, pickerModel } from '@components/Picker/Picker.store';
import { ToastModel, toastModel } from '@components/Toast/Toast.store';
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

type StoreModel = {
  clearEntities: Action<StoreModel>;
  community: Computed<StoreModel, ICommunity>;
  entities: IEntities;
  integrations: Computed<StoreModel, IIntegrations>;
  isOwner: Computed<StoreModel, boolean>;
  loader: LoaderModel;
  member: Computed<StoreModel, IMember>;
  mergeEntities: Action<StoreModel, MergeEntitiesArgs>;
  modal: ModalModel;
  picker: PickerModel;
  toast: ToastModel;
  updateCommunity: Action<StoreModel, Partial<ICommunity>>;
  updateEntities: Action<StoreModel, UpdateEntitiesArgs>;
  user: Computed<StoreModel, IUser>;
};

export const store = createStore<StoreModel>(
  {
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

    integrations: computed(({ community, entities }) => {
      const { byId } = entities.integrations;
      return byId[community?.integrations];
    }),

    isOwner: computed(({ member }) => member?.role === 'OWNER'),

    loader: loaderModel,

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
        {
          communityReferenceColumn,
          data,
          schema,
          setActiveId
        }: MergeEntitiesArgs
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

    modal: modalModel,

    picker: pickerModel,

    toast: toastModel,

    updateCommunity: action(
      ({ entities, ...state }, payload: Partial<ICommunity>) => {
        const { communities } = entities;
        const { id } = state.community;

        return {
          ...state,
          entities: {
            ...entities,
            communities: {
              ...communities,
              byId: {
                ...communities.byId,
                [id]: { ...state.community, ...payload }
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

        const updatedById = ids.reduce(
          (acc: Record<string, any>, id: string) => {
            return { ...acc, [id]: { ...byId[id], ...updatedData } };
          },
          {}
        );

        // console.

        return {
          ...state,
          entities: {
            ...entities,
            [entityName]: {
              activeId,
              allIds,
              byId: { ...byId, ...updatedById }
            }
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
  },
  { disableImmer: true }
);

export const { useStoreActions, useStoreState } = createTypedHooks<
  StoreModel
>();
