import useMutation from '@gql/useMutation';
import {
  FormItemData,
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@organisms/Form/Form.types';
import { IMemberValue } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { MutationEvent } from '@util/constants.events';
import { MemberValueInput, UpdateMemberValueArgs } from './Profile.types';

const useUpdateMemberValues = (): OnFormSubmitFunction => {
  const [updateMemberValues] = useMutation<
    IMemberValue[],
    UpdateMemberValueArgs
  >({
    fields: ['id', 'value', { member: ['id'] }, { question: ['id'] }],
    operation: MutationEvent.UPDATE_MEMBER_VALUES,
    schema: [Schema.MEMBER_VALUE],
    types: { items: { required: true, type: '[MemberValueArgs!]' } }
  });

  const onSubmit = async (args: OnFormSubmitArgs) => {
    const { closeModal, items, setError, showToast } = args;

    const data: MemberValueInput[] = Object.values(items).map(
      (item: FormItemData) => {
        const { questionId, value } = item;
        return { questionId, value: value as string[] };
      }
    );

    const { error } = await updateMemberValues({ items: data });

    if (error) {
      setError(error);
      return;
    }

    closeModal();
    showToast({ message: 'Membership information updated.' });
  };

  return onSubmit;
};

export default useUpdateMemberValues;
