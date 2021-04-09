import { action, computed } from 'easy-peasy';

import { DbModel, SetActiveEntitesArgs } from './db.types';

const dbActiveIds: Pick<
  DbModel,
  'communityId' | 'eventId' | 'memberId' | 'userId'
> = { communityId: null, eventId: null, memberId: null, userId: null };

const dbStore: DbModel = {
  ...dbActiveIds,

  isAuthenticated: computed(
    ({ communityId, memberId, userId }) =>
      !!communityId && !!memberId && !!userId
  ),

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
  )
};

export default dbStore;
