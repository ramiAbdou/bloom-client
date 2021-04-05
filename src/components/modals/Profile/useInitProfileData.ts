import { IMemberValue } from '@db/db.entities';
import { Schema } from '@db/db.entities';
import { QueryResult } from '@gql/gql.types';
import useQuery from '@gql/useQuery';
import IdStore from '@store/Id.store';

const useInitProfileData = (): Partial<QueryResult> => {
  const memberId: string = IdStore.useStoreState((state) => state.id);

  const result = useQuery<IMemberValue[]>({
    fields: ['id', 'member.id', 'question.id', 'value'],
    operation: 'memberValues',
    schema: [Schema.MEMBER_VALUE],
    where: { memberId }
  });

  return result;
};

export default useInitProfileData;
