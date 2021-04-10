import { useStoreState } from '@core/store/Store';
import { IMember, IUser } from '@core/db/db.entities';
import useFindOne from '@gql/hooks/useFindOne';

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

  const { members }: IUser = useFindOne(IUser, {
    fields: ['members.community.id', 'members.id'],
    where: { id: userId }
  });

  return (
    !!members &&
    members.some((member: IMember) => member.community.id === communityId)
  );
};

export default useIsMember;
