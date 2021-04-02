import useHasuraQuery from '@hooks/useHasuraQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { IMemberValue } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import IdStore from '@store/Id.store';

const useInitProfileData = (): Partial<QueryResult> => {
  const memberId: string = IdStore.useStoreState((state) => state.id);

  const result = useHasuraQuery<IMemberValue[]>({
    fields: ['id', 'member.id', 'question.id', 'value'],
    operation: 'memberValues',
    queryName: 'GetMemberValuesByMemberId',
    schema: [Schema.MEMBER_VALUE],
    variables: { memberId: { type: 'String!', value: memberId } },
    where: { member_id: { _eq: '$memberId' } }
  });

  return result;
};

export default useInitProfileData;
