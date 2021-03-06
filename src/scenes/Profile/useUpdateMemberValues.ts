import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { IMemberValue } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { MutationEvent } from '@util/events';
import { UpdateMemberValueArgs } from './Profile.types';

const useUpdateMemberValues = (): OnFormSubmit => {
  const [updateMemberValues] = useMutation<
    IMemberValue[],
    UpdateMemberValueArgs
  >({
    fields: ['id', 'value', { question: ['id'] }],
    operation: MutationEvent.UPDATE_MEMBER_VALUES,
    schema: [Schema.MEMBER_VALUE],
    types: { items: { required: true, type: '[MemberValueArgs!]' } }
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

    const { error } = await updateMemberValues({ items: data });

    if (error) {
      setError(error);
      return;
    }

    showToast({ message: 'Membership information updated.' });
    closeModal();
  };

  return onSubmit;
};

export default useUpdateMemberValues;
