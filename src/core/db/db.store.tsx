import { computed } from 'easy-peasy';

import { DbModel } from './db.types';
import { setActiveEntities } from './db.util';

const dbStore: DbModel = {
  communityId: null,

  eventId: null,

  isAuthenticated: computed(
    ({ communityId, memberId, userId }) =>
      !!communityId && !!memberId && !!userId
  ),

  memberId: null,

  setActiveEntities,

  userId: null
};

export default dbStore;
