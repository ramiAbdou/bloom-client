import { QueryResult } from '@gql/gql.types';
import useQuery from '@gql/useQuery';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';

const useInitDirectory = (): QueryResult<IMember[]> => {
  const communityId: string = useStoreState(({ db }) => db.community.id);

  const result = useQuery<IMember[]>({
    fields: [
      'bio',
      'community.id',
      'email',
      'firstName',
      'id',
      'joinedAt',
      'lastName',
      'memberType.id',
      'memberValues.id',
      'memberValues.member.id',
      'memberValues.question.id',
      'memberValues.value',
      'pictureUrl',
      'position',
      'role',
      'status'
    ],
    operation: 'members',
    queryName: 'GetMembersByCommunityId',
    schema: [Schema.MEMBER],
    where: { communityId }
  });

  return result;
};

export default useInitDirectory;
