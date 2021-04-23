import { showToast } from 'src/App.reactive';

import {
  FormItemData,
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form.types';
import { modalVar } from '@core/state/Modal.reactive';
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

  const onSubmit = async ({ items, setError }: OnFormSubmitArgs) => {
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

    modalVar(null);
    showToast({ message: 'Membership information updated.' });
  };

  return onSubmit;
};

export default useUpdateMemberValues;
