import { action, computed } from 'easy-peasy';

import { DbModel, SetActiveEntitesArgs } from './db.types';

const dbStore: DbModel = {
  communityId: null,

  eventId: null,

  isAuthenticated: computed(
    ({ communityId, memberId, userId }) =>
      !!communityId && !!memberId && !!userId
  ),

  memberId: null,

  setActiveEntities: action(
    (
      state,
      { communityId, eventId, memberId, userId }: SetActiveEntitesArgs
    ) => {
      return {
        ...state,
        communityId: communityId ?? state.communityId,
        eventId: eventId ?? state.eventId,
        memberId: memberId ?? state.memberId,
        userId: userId ?? state.userId
      };
    }
  ),

  userId: null
};

export default dbStore;
