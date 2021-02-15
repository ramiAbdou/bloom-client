import { action, computed } from 'easy-peasy';

import {
  ICommunity,
  ICommunityApplication,
  IEvent,
  IIntegrations,
  IMember,
  initialEntities,
  IUser
} from '@store/Db/entities';
import { updateDocumentColors } from '@util/colorUtil';
import { AddEntitiesArgs, DbModel, SetActiveArgs } from './Db.types';
import mergeEntities from './mergeEntities';

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

  application: computed(({ community, entities }) => {
    const { byId: byApplicationId } = entities.applications;
    return byApplicationId[community?.application] as ICommunityApplication;
  }),

  byApplicationId: computed(({ entities }) => entities.applications?.byId),
  byAttendeeId: computed(({ entities }) => entities.attendees?.byId),
  byCommunityId: computed(({ entities }) => entities.communities?.byId),
  byDataId: computed(({ entities }) => entities.data?.byId),
  byEventId: computed(({ entities }) => entities.events?.byId),
  byGuestId: computed(({ entities }) => entities.guests?.byId),
  byIntegrationsId: computed(({ entities }) => entities.integrations?.byId),
  byMemberId: computed(({ entities }) => entities.members?.byId),
  byPaymentId: computed(({ entities }) => entities.payments?.byId),
  byQuestionId: computed(({ entities }) => entities.questions?.byId),
  byTypeId: computed(({ entities }) => entities.types?.byId),
  byUserId: computed(({ entities }) => entities.users?.byId),
  byWatchId: computed(({ entities }) => entities.watches?.byId),

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

    if (!result) return null;

    // Updates the primary color (and gray's accordingly).
    updateDocumentColors(result.primaryColor ?? '#f58023');

    return {
      ...result,
      canCollectDues: hasPaidMembership && !!integrations?.stripeAccountId
    };
  }),

  entities: initialEntities,

  event: computed(({ entities }) => {
    const { activeId, byId } = entities.events;
    return byId[activeId] as IEvent;
  }),

  integrations: computed(({ community, entities }) => {
    const { byId: byIntegrationId } = entities.integrations;
    return byIntegrationId[community?.integrations] as IIntegrations;
  }),

  isAuthenticated: computed(({ entities }) => {
    return (
      !!entities.communities.activeId &&
      !!entities.members.activeId &&
      !!entities.users.activeId
    );
  }),

  /**
   * Returns true if the authenticated user has a membership with the active
   * community.
   *
   * Useful when going to pages outside of authenticated realm, such as viewing
   * IndividualEvent.
   */
  isMember: computed(({ byMemberId, community, user }) => {
    return user?.members?.some((memberId: string) => {
      const member: IMember = byMemberId[memberId];
      return member.community === community?.id;
    });
  }),

  member: computed(({ entities }) => {
    const { activeId, byId } = entities.members;
    return byId[activeId] as IMember;
  }),

  mergeEntities,

  setActive: action((state, { id, table }: SetActiveArgs) => {
    return {
      ...state,
      entities: {
        ...state.entities,
        [table]: { ...state.entities[table], activeId: id }
      }
    };
  }),

  /**
   * There should only be one user queried in the application, and that is
   * the logged-in user.
   */
  user: computed(({ entities }) => {
    const { activeId, byId } = entities.users;
    return byId[activeId] as IUser;
  })
};

export default dbStore;
