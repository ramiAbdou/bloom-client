import { IMember, IUser } from '@db/db.entities';
import useFindOne from '@gql/useFindOne';
import { useStoreState } from '@store/Store';

/**
 * Returns true if the authenticated user has a membership with the active
 * community.
 *
 * Useful when going to pages outside of authenticated realm, such as viewing
 * IndividualEvent.
 */
const useIsMember = (): boolean => {
  const communityId: string = useStoreState(({ db }) => db.community?.id);
  const userId: string = useStoreState(({ db }) => db.userId);

  const { members }: IUser = useFindOne(IUser, {
    fields: ['members.community.id', 'members.id'],
    where: { id: userId }
  });

  if (!members) return false;

  return members.some((member: IMember) => member.community.id === communityId);
};

export default useIsMember;
