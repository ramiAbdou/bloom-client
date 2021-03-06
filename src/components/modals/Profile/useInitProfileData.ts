import useQuery from '@hooks/useQuery';
import { IMemberValue } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import IdStore from '@store/Id.store';
import { QueryEvent } from '@util/events';

const useInitProfileData = (): boolean => {
  const memberId = IdStore.useStoreState((store) => store.id);

  const { loading } = useQuery<IMemberValue[]>({
    fields: ['id', 'value', { member: ['id'] }, { question: ['id'] }],
    operation: QueryEvent.GET_MEMBER_VALUES,
    schema: [Schema.MEMBER_VALUE],
    types: { memberId: { required: false } },
    variables: { memberId }
  });

  return loading;
};

export default useInitProfileData;
