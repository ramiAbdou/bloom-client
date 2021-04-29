import { showToast } from 'src/App.reactive';

import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form';
import { FormItemData } from '@components/organisms/Form/Form.types';
import { closeModal } from '@components/organisms/Modal/Modal.state';
import useBloomMutation from '@gql/hooks/useBloomMutation';
import { IMemberValue } from '@util/constants.entities';
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

  const onSubmit = async ({ formDispatch, items }: OnFormSubmitArgs) => {
    const data: MemberValueInput[] = Object.values(items).map(
      (item: FormItemData) => {
        const { questionId, value } = item;
        return { questionId, value: value as string[] };
      }
    );

    const { error } = await updateMemberValues({ items: data });

    if (error) {
      formDispatch({
        error: 'Failed to update membership information.',
        type: 'SET_ERROR'
      });

      return;
    }

    closeModal();
    showToast({ message: 'Membership information updated.' });
  };

  return onSubmit;
};

export default useUpdateMemberValues;
