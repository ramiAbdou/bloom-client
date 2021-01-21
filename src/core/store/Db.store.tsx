import deepmerge from 'deepmerge';
import { Action, action, Computed, computed } from 'easy-peasy';
import { normalize, Schema } from 'normalizr';

import { updateDocumentColors } from '@util/colorUtil';
import {
  ICommunity,
  IEntities,
  IIntegrations,
  IMember,
  initialEntities,
  IQuestion,
  IUser
} from './entities';

interface MergeEntitiesArgs {
  communityReferenceColumn?: string;
  data?: any;
  schema?: Schema<any>;
  setActiveId?: boolean;
}

interface UpdateEntitiesArgs {
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
}

export type DbModel = {
  canCollectDues: Computed<DbModel, boolean>;
  clearEntities: Action<DbModel>;
  community: Computed<DbModel, ICommunity>;
  entities: IEntities;
  hasPaidMembership: Computed<DbModel, boolean>;
  integrations: Computed<DbModel, IIntegrations>;
  isOwner: Computed<DbModel, boolean>;
  member: Computed<DbModel, IMember>;
  mergeEntities: Action<DbModel, MergeEntitiesArgs>;
  setActiveCommunity: Action<DbModel, string>;
  updateCommunity: Action<DbModel, Partial<ICommunity>>;
  updateEntities: Action<DbModel, UpdateEntitiesArgs>;
  user: Computed<DbModel, IUser>;
};

export const dbModel: DbModel = {
  canCollectDues: computed(({ community, entities, hasPaidMembership }) => {
    const { byId: byIntegrationsId } = entities.integrations;

    const integrations: IIntegrations =
      byIntegrationsId[community?.integrations];

    return hasPaidMembership && !!integrations?.stripeAccountId;
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

  hasPaidMembership: computed(({ community, entities }) => {
    const { byId: byTypeId } = entities.types;
    return community?.types?.some(
      (typeId: string) => !byTypeId[typeId]?.isFree
    );
  }),

  integrations: computed(({ entities }) => {
    const { activeId, byId: byCommunityId } = entities.communities;
    const { byId } = entities.integrations;
    return byId[byCommunityId[activeId]?.integrations];
  }),

  isOwner: computed(({ member }) => member?.role === 'OWNER'),

  member: computed(({ entities }) => {
    const { activeId, byId } = entities.members;
    return byId[activeId] as IMember;
  }),

  /**
   * Main update function that updates all entities (front-end DB). Uses
   * the lodash deep merge function to make the updates.
   */
  mergeEntities: action(
    (state, { data, schema, setActiveId }: MergeEntitiesArgs) => {
      const parsedEntities = Object.entries(
        normalize(data, schema).entities
      ).reduce((acc: Record<string, any>, [key, value]) => {
        const activeId = setActiveId
          ? ['users'].includes(key) && { activeId: Object.keys(value)[0] }
          : {};

        return {
          ...acc,
          [key]: { ...activeId, allIds: Object.keys(value), byId: value }
        };
      }, {});

      return {
        ...state,
        entities: deepmerge(state.entities, parsedEntities, {
          arrayMerge: (target: any[], source: any[]) => {
            const updatedSource = source.filter(
              (value: any) => !target.includes(value)
            );

            // Concat the source to the target.
            return target.concat(updatedSource);
          }
        }) as IEntities
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
  setActiveCommunity: action(
    ({ entities, user, ...state }, communityId: string) => {
      const { byId: byMemberId } = entities.members;

      const memberId: string = user?.members.find(
        (id: string) => byMemberId[id]?.community === communityId
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
