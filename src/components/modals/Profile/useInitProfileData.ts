import useQuery from '@hooks/useQuery';
import { IMemberData } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import ProfileStore from './Profile.store';

const useInitProfileData = (): boolean => {
  const memberId = ProfileStore.useStoreState((store) => store.memberId);

  const { loading } = useQuery<IMemberData[]>({
    fields: ['id', 'value', { member: ['id'] }, { question: ['id'] }],
    operation: 'getMemberData',
    schema: [Schema.MEMBER_DATA],
    types: { memberId: { required: false } },
    variables: { memberId }
  });

  return loading;
};

export default useInitProfileData;
