import { IMemberValue } from '@db/db.entities';
import useBloomMutation from '@gql/useBloomMutation';
import {
  FormItemData,
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@organisms/Form/Form.types';
import { MutationEvent } from '@util/constants.events';
import { MemberValueInput, UpdateMemberValueArgs } from './Profile.types';

const useUpdateMemberValues = (): OnFormSubmitFunction => {
  const [updateMemberValues] = useBloomMutation<
    IMemberValue[],
    UpdateMemberValueArgs
  >({
    fields: ['id', 'value', { member: ['id'] }, { question: ['id'] }],
    operation: MutationEvent.UPDATE_MEMBER_VALUES,
    types: { items: { required: true, type: '[MemberValueArgs!]' } }
  });

  const onSubmit = async ({
    closeModal,
    items,
    setError,
    showToast
  }: OnFormSubmitArgs) => {
    const data: MemberValueInput[] = Object.values(items).map(
      (item: FormItemData) => {
        const { questionId, value } = item;
        return { questionId, value: value as string[] };
      }
    );

    const { error } = await updateMemberValues({ items: data });

    if (error) {
      setError('Failed to update membership information.');
      return;
    }

    closeModal();
    showToast({ message: 'Membership information updated.' });
  };

  return onSubmit;
};

export default useUpdateMemberValues;
