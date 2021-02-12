import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { IMemberData } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { UpdateMemberDataArgs } from './Profile.types';

const useUpdateMemberData = (): OnFormSubmit => {
  const [updateMemberData] = useMutation<IMemberData[], UpdateMemberDataArgs>({
    fields: ['id', 'value', { question: ['id'] }],
    operation: 'updateMemberData',
    schema: [Schema.MEMBER_DATA],
    types: { items: { required: true, type: '[MemberDataArgs!]' } }
  });

  const onSubmit = async ({
    closeModal,
    items,
    setError,
    showToast
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
