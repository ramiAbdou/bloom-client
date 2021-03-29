import { action, computed } from 'easy-peasy';

import { IMember, initialEntities } from '@store/Db/entities';
import { DbModel } from './Db.types';
import { mergeEntities, setActive } from './Db.util';
import dbActiveStore from './DbActive.store';
import dbByIdStore from './DbById.store';

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
  setActive
};

export default dbStore;
