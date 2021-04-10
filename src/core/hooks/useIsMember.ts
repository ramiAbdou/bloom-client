import { IMember } from '@core/db/db.entities';
import { useStoreState } from '@core/store/Store';
import useFindOneFull from '@gql/hooks/useFindOneFull';

/**
 * Returns true if the authenticated user has a membership with the active
 * community.
 *
 * Useful when going to pages outside of authenticated realm, such as viewing
 * IndividualEvent.
 */
const useIsMember = (): boolean => {
  const communityId: string = useStoreState(({ db }) => db.communityId);
  const userId: string = useStoreState(({ db }) => db.userId);

  const { data: member, loading } = useFindOneFull(IMember, {
    fields: ['community.id'],
    where: { communityId, userId }
  });

  return loading || !!member.id;
};

export default useIsMember;
