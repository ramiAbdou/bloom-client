import useQuery from '@hooks/useQuery';
import { IMemberValue } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import ProfileStore from './Profile.store';

const useInitProfileData = (): boolean => {
  const memberId = ProfileStore.useStoreState((store) => store.memberId);

  const { loading } = useQuery<IMemberValue[]>({
    fields: ['id', 'value', { member: ['id'] }, { question: ['id'] }],
    operation: 'getMemberValues',
    schema: [Schema.MEMBER_VALUE],
    types: { memberId: { required: false } },
    variables: { memberId }
  });

  return loading;
};

export default useInitProfileData;
