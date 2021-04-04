import { QueryResult } from '@gql/gql.types';
import useQuery from '@gql/useQuery';
import { IMemberValue } from '@store/db/Db.entities';
import { Schema } from '@store/db/Db.schema';
import { useStoreState } from '@store/Store';

const useInitProfileMembership = (): QueryResult<IMemberValue[]> => {
  const memberId: string = useStoreState(({ db }) => db.member.id);

  const result = useQuery<IMemberValue[]>({
    fields: ['id', 'member.id', 'question.id', 'value'],
    operation: 'memberValues',
    schema: [Schema.MEMBER_VALUE],
    where: { memberId }
  });

  return result;
};

export default useInitProfileMembership;
