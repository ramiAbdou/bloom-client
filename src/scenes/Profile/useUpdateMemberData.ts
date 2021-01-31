import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { IMemberData } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions } from '@store/Store';
import { UPDATE_MEMBER_DATA, UpdateMemberDataArgs } from './Profile.gql';

const useUpdateUser = (): OnFormSubmit => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const [updateMemberData] = useMutation<IMemberData[], UpdateMemberDataArgs>({
    name: 'updateMemberData',
    query: UPDATE_MEMBER_DATA,
    schema: [Schema.MEMBER_DATA]
  });

  const onSubmit = async ({ items, setErrorMessage }: OnFormSubmitArgs) => {
    const { error } = await updateMemberData({
      items: Object.values(items).map(({ id, value }) => ({ id, value }))
    });

    if (error) {
      setErrorMessage(error);
      return;
    }

    showToast({ message: 'Membership information updated.' });
    setTimeout(closeModal, 0);
    closeModal();
  };

  return onSubmit;
};

export default useUpdateUser;
