import { memberIdVar, showToast } from 'src/App.reactive';

import { DocumentNode, gql, useMutation } from '@apollo/client';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form';
import { FormItemData } from '@components/organisms/Form/Form.types';
import { closeModal } from '@components/organisms/Modal/Modal.state';
import { IMemberValue } from '@util/constants.entities';

export interface MemberValueInput {
  memberId: string;
  questionId: string;
  value: string;
}

export interface UpsertMemberValuesArgs {
  memberValueInputs: MemberValueInput[];
}

export interface UpsertMemberValuesResult {
  createMemberValues: { returning: IMemberValue[] };
}

const UPSERT_MEMBER_VALUES: DocumentNode = gql`
  mutation UpsertMemberValues(
    $memberValueInputs: [member_values_insert_input!]!
  ) {
    createMemberValues(
      objects: $memberValueInputs
      on_conflict: {
        constraint: member_values_member_id_question_id_unique
        update_columns: [updatedAt, value]
      }
    ) {
      returning {
        id
        updatedAt
        value
      }
    }
  }
`;

const useUpdateMemberValues = (): OnFormSubmitFunction => {
  const [upsertMemberValues] = useMutation<
    UpsertMemberValuesResult,
    UpsertMemberValuesArgs
  >(UPSERT_MEMBER_VALUES);

  const onSubmit = async ({ formDispatch, items }: OnFormSubmitArgs) => {
    const memberValueInputs: MemberValueInput[] = Object.values(items).map(
      (item: FormItemData) => {
        return {
          memberId: memberIdVar(),
          questionId: item.questionId,
          value: item.value?.toString()
        };
      }
    );

    try {
      await upsertMemberValues({ variables: { memberValueInputs } });
      closeModal();
      showToast({ message: 'Membership information updated.' });
    } catch (e) {
      formDispatch({
        error: 'Failed to update membership information.',
        type: 'SET_ERROR'
      });
    }
  };

  return onSubmit;
};

export default useUpdateMemberValues;
