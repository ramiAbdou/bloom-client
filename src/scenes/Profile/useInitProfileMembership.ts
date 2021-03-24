import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { IMemberValue } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { QueryEvent } from '@util/constants.events';

const useInitProfileMembership = (): QueryResult<IMemberValue[]> => {
  const memberId: string = useStoreState(({ db }) => db.member.id);

  const result: QueryResult<IMemberValue[]> = useQuery<IMemberValue[]>({
    fields: ['id', 'value', { member: ['id'] }, { question: ['id'] }],
    operation: QueryEvent.GET_MEMBER_VALUES,
    schema: [Schema.MEMBER_VALUE],
    types: { memberId: { required: false } },
    variables: { memberId }
  });

  return result;
};

export default useInitProfileMembership;
