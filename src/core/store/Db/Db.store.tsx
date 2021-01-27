import { action, computed } from 'easy-peasy';
import { normalize } from 'normalizr';

import {
  ICommunity,
  IEntities,
  IEvent,
  IIntegrations,
  IMember,
  initialEntities
} from '@store/Db/entities';
import { updateDocumentColors } from '@util/colorUtil';
import { AddEntitiesArgs, DbModel, MergeEntitiesArgs } from './Db.types';
import deleteEntities from './deleteEntities';
import { mergeStrategy } from './schema';

const dbStore: DbModel = {
  addEntities: action(
    (
      { entities, ...state },
      { entities: entitiesToAdd, table: tableName }: AddEntitiesArgs
    ) => {
      const table = entities[tableName];

      const updatedById = entitiesToAdd.reduce((acc, entity: IMember) => {
        return { ...acc, [entity.id]: entity };
      }, table.byId);

      const updatedTable = { ...table, byId: updatedById };

      return {
        ...state,
        entities: { ...entities, [tableName]: updatedTable }
      };
    }
  ),

  clearEntities: action((state) => ({ ...state, entities: initialEntities })),

  community: computed(({ entities }) => {
    const { activeId, byId } = entities.communities;
    const { byId: byIntegrationsId } = entities.integrations;
    const { byId: byTypeId } = entities.types;

    const result: ICommunity = byId[activeId];
    const integrations: IIntegrations = byIntegrationsId[result?.integrations];

    const hasPaidMembership: boolean = result?.types?.some(
      (typeId: string) => !byTypeId[typeId]?.isFree
    );

    // Updates the primary color (and gray's accordingly).
    if (result) updateDocumentColors(result.primaryColor ?? '#f58023');

    return {
      ...result,
      canCollectDues: hasPaidMembership && !!integrations?.stripeAccountId
    };
  }),

  deleteEntities,

  entities: initialEntities,

  event: computed(({ entities }) => {
    const { activeId, byId } = entities.events;
    return byId[activeId] as IEvent;
  }),

  integrations: computed(({ community, entities }) => {
    const { byId: byIntegrationId } = entities.integrations;
    return byIntegrationId[community?.integrations] as IIntegrations;
  }),

  isAuthenticated: false,

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
      const normalizedEntities = normalize(data, schema).entities;

      const parsedEntities = Object.entries(normalizedEntities).reduce(
        (acc: Record<string, any>, [key, value]) => {
          const activeId = setActiveId
            ? key === 'users' && { activeId: Object.keys(value)[0] }
            : {};

          return { ...acc, [key]: { ...activeId, byId: value } };
        },
        {}
      );

      return {
        ...state,
        entities: mergeStrategy(state.entities, parsedEntities) as IEntities
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

  setActiveEvent: action(({ entities, ...state }, eventId: string) => ({
    ...state,
    entities: {
      ...entities,
      events: { ...entities.events, activeId: eventId }
    }
  })),

  setIsAuthenticated: action((state, isAuthenticated) => ({
    ...state,
    isAuthenticated
  })),

  /**
   * There should only be one user queried in the application, and that is
   * the logged-in user.
   */
  user: computed(({ entities }) => {
    const { activeId, byId } = entities.users;
    return byId[activeId];
  })
};

export default dbStore;
