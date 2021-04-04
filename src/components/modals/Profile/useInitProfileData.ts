import { QueryResult } from '@gql/gql.types';
import useQuery from '@gql/useQuery';
import { IMemberValue } from '@store/Db/Db.entities';
import { Schema } from '@store/Db/Db.schema';
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
