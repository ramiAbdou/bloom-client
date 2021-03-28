import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { IMemberValue } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import IdStore from '@store/Id.store';
import { QueryEvent } from '@util/constants.events';

const useInitProfileData = (): Partial<QueryResult> => {
  const memberId: string = IdStore.useStoreState((state) => {
    return state.id;
  });

  const { loading } = useQuery<IMemberValue[]>({
    fields: ['id', 'value', { member: ['id'] }, { question: ['id'] }],
    operation: QueryEvent.LIST_MEMBER_VALUES,
    schema: [Schema.MEMBER_VALUE],
    types: { memberId: { required: false } },
    variables: { memberId }
  });

  return { loading };
};

export default useInitProfileData;
