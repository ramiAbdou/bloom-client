import { action, computed } from 'easy-peasy';

import { DbModel, initialEntities } from './db.types';
import { mergeEntities, setActiveEntities } from './db.util';
import dbActiveStore from './dbActive.store';
import dbByIdStore from './dbById.store';

const dbStore: DbModel = {
  ...dbActiveStore,
  ...dbByIdStore,

  clearEntities: action((state) => {
    return { ...state, entities: initialEntities };
  }),

  entities: initialEntities,

  isAuthenticated: computed(
    ({ entities }) =>
      !!entities.communities.activeId &&
      !!entities.members.activeId &&
      !!entities.users.activeId
  ),

  mergeEntities,

  setActiveEntities
};

export default dbStore;
