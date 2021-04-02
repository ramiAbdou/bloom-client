import useHasuraQuery from '@hooks/useHasuraQuery';
import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { IMember, IMemberValue } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { QueryEvent } from '@util/constants.events';

const useInitMembersAnalytics = (): Partial<QueryResult> => {
  const communityId: string = useStoreState(({ db }) => db.community.id);

  const { loading: loading1 }: QueryResult<IMember[]> = useQuery<IMember[]>({
    fields: [
      'id',
      'isDuesActive',
      'status',
      { community: ['id'] },
      { memberType: ['id'] }
    ],
    operation: QueryEvent.LIST_MEMBERS,
    schema: [Schema.MEMBER],
    types: { communityId: { required: false } },
    variables: { communityId }
  });

  const { loading: loading2 } = useHasuraQuery<IMemberValue[]>({
    fields: ['id', 'member.id', 'question.id', 'value'],
    operation: 'memberValues',
    queryName: 'GetMemberValuesByCommunityId',
    schema: [Schema.MEMBER_VALUE],
    variables: { communityId: { type: 'String!', value: communityId } },
    where: { member: { community: { id: { _eq: '$communityId' } } } }
  });

  return { loading: loading1 || loading2 };
};

export default useInitMembersAnalytics;
