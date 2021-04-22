import { communityIdVar, userIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import useFindOne from '@gql/hooks/useFindOne';
import { IMember } from '@util/db.entities';

/**
 * Returns true if the authenticated user has a membership with the active
 * community.
 *
 * Useful when going to pages outside of authenticated realm, such as viewing
 * IndividualEvent.
 */
const useIsMember = (): boolean => {
  const communityId: string = useReactiveVar(communityIdVar);
  const userId: string = useReactiveVar(userIdVar);

  const { data: member, loading } = useFindOne(IMember, {
    fields: ['community.id'],
    where: { communityId, userId }
  });

  return loading || !!member.id;
};

export default useIsMember;
