import { QueryResult } from '@gql/gql.types';
import useQuery from '@gql/useQuery';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';

const useInitMembersAnalytics = (): QueryResult<IMember[]> => {
  const communityId: string = useStoreState(({ db }) => db.community.id);

  const result = useQuery<IMember[]>({
    fields: [
      'id',
      'community.id',
      'memberType.id',
      'memberValues.id',
      'memberValues.member.id',
      'memberValues.question.id',
      'memberValues.value',
      'status'
    ],
    operation: 'members',
    queryName: 'GetMemberValuesByCommunityId',
    schema: [Schema.MEMBER],
    where: { communityId }
  });

  return result;
};

export default useInitMembersAnalytics;
