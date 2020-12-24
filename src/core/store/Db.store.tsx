/**
 * @fileoverview DB Store
 * - Acts a client-side DB in which normalized entities live.
 */

import { Action, action, Computed, computed } from 'easy-peasy';
import mergeWith from 'lodash.mergewith';
import { normalize, Schema } from 'normalizr';

import { updateDocumentColors } from '@util/util';
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
 * Parses the entities using the normalization function, and sets the activeId
 * of the entities if the entity is a communities or members.
 *
 * @param data Data to normalize.
 * @param schema Schema in which to normalize the data on.
 */
const parseEntities = (data: any, schema: Schema<any>, setActiveId?: boolean) =>
  Object.entries(normalize(data, schema).entities).reduce(
    (acc: Record<string, any>, [key, value]) => {
      const activeId = setActiveId
        ? ['communities', 'members', 'users'].includes(key) && {
            activeId: Object.keys(value)[0]
          }
        : {};

      return {
        ...acc,
        [key]: { ...activeId, allIds: Object.keys(value), byId: value }
      };
    },
    {}
  );

type UpdateEntitiesArgs = {
  ids: string[];
  entityName:
    | 'communities'
    | 'integrations'
    | 'members'
    | 'questions'
    | 'users';
  updatedData?: Partial<
    ICommunity | IIntegrations | IMember | IQuestion | IUser
  >;
};

type MergeEntitiesArgs = {
  communityReferenceColumn?: string;
  data?: any;
  schema?: Schema<any>;
  setActiveId?: boolean;
};

export type DbModel = {
  canCollectDues: Computed<DbModel, boolean>;
  clearEntities: Action<DbModel>;
  community: Computed<DbModel, ICommunity>;
  entities: IEntities;
  integrations: Computed<DbModel, IIntegrations>;
  isOwner: Computed<DbModel, boolean>;
  member: Computed<DbModel, IMember>;
  mergeEntities: Action<DbModel, MergeEntitiesArgs>;
  updateActiveCommunity: Action<DbModel, string>;
  updateCommunity: Action<DbModel, Partial<ICommunity>>;
  updateEntities: Action<DbModel, UpdateEntitiesArgs>;
  user: Computed<DbModel, IUser>;
};

export const dbModel: DbModel = {
  canCollectDues: computed(({ community, entities }) => {
    const { byId: byIntegrationsId } = entities.integrations;
    const { byId: byTypeId } = entities.types;

    const integrations: IIntegrations =
      byIntegrationsId[community?.integrations];

    return (
      integrations?.stripeAccountId &&
      community.types?.some((typeId: string) => !byTypeId[typeId]?.isFree)
    );
  }),

  clearEntities: action((state) => ({ ...state, entities: initialEntities })),

  community: computed(({ entities }) => {
    const { activeId, byId } = entities.communities;
    const result: ICommunity = byId[activeId];

    // Updates the primary color (and gray's accordingly).
    if (result) updateDocumentColors(result.primaryColor ?? '#f58023');
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
    return byId[activeId];
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
      const updatedCommunities = !communityReferenceColumn
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
                  [communityReferenceColumn]: mergeWith(
                    community[communityReferenceColumn] ?? [],
                    parsedEntities[communityReferenceColumn].allIds
                  )
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

  /**
   * If a user is a part of multiple communities, this allows a user to switch
   * between the communities.
   *
   * Precondition: The user must be a member of that community in order to
   * actually join it.
   */
  updateActiveCommunity: action(
    ({ entities, user, ...state }, communityId: string) => {
      const { byId } = entities.members;

      const memberId = user.members.find(
        (id: string) => byId[id]?.community === communityId
      );

      return {
        ...state,
        entities: {
          ...entities,
          communities: { ...entities.communities, activeId: communityId },
          members: { ...entities.members, activeId: memberId }
        },
        user
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
