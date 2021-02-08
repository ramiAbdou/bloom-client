import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { IMemberData } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions } from '@store/Store';
import { UPDATE_MEMBER_DATA, UpdateMemberDataArgs } from './Profile.gql';

const useUpdateMemberData = (): OnFormSubmit => {
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const [updateMemberData] = useMutation<IMemberData[], UpdateMemberDataArgs>({
    name: 'updateMemberData',
    query: UPDATE_MEMBER_DATA,
    schema: [Schema.MEMBER_DATA]
  });

  const onSubmit = async ({
    closeModal,
    items,
    setError
  }: OnFormSubmitArgs) => {
    const data = Object.values(items).map(({ questionId, value }) => ({
      questionId,
      value
    }));

    const { error } = await updateMemberData({ items: data });

    if (error) {
      setError(error);
      return;
    }

    showToast({ message: 'Membership information updated.' });
    closeModal();
  };

  return onSubmit;
};

export default useUpdateMemberData;
