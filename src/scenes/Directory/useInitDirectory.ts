import { ICommunity } from '@db/db.entities';
import { QueryResult } from '@gql/gql.types';
import useQuery from '@gql/useQuery';
import { useStoreState } from '@store/Store';

const useInitDirectory = (): QueryResult<ICommunity[]> => {
  const communityId: string = useStoreState(({ db }) => db.community.id);

  const result = useQuery<ICommunity[]>({
    fields: [
      'id',
      'members.id',
      'members.bio',
      'members.email',
      'members.firstName',
      'members.lastName',
      'members.joinedAt',
      'members.pictureUrl',
      'members.position',
      'members.role',
      'members.status'
    ],
    operation: 'communities',
    where: { id: communityId }
  });

  return result;
};

export default useInitDirectory;
