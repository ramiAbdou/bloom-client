import { action, computed } from 'easy-peasy';

import { DbModel, initialEntities } from './db.types';
import { mergeEntities, setActiveEntities } from './db.util';
import dbByIdStore from './dbById.store';

const dbStore: DbModel = {
  ...dbByIdStore,

  clearEntities: action((state) => {
    return { ...state, entities: initialEntities };
  }),

  communityId: null,

  entities: initialEntities,

  eventId: null,

  isAuthenticated: computed(
    ({ communityId, memberId, userId }) =>
      !!communityId && !!memberId && !!userId
  ),

  memberId: null,

  mergeEntities,

  setActiveEntities,

  userId: null
};

export default dbStore;
