import { action, computed } from 'easy-peasy';

import { IMember, initialEntities } from '@db/db.entities';
import { DbModel } from './db.types';
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

  isInitialized: computed(
    ({ community, member, user }) => !!community && !!member && !!user
  ),

  /**
   * Returns true if the authenticated user has a membership with the active
   * community.
   *
   * Useful when going to pages outside of authenticated realm, such as viewing
   * IndividualEvent.
   */
  isMember: computed(({ byMemberId, community, user }) =>
    user?.members?.some((memberId: string) => {
      const member: IMember = byMemberId[memberId];
      return member.community === community?.id;
    })
  ),

  mergeEntities,

  setActiveEntities
};

export default dbStore;
