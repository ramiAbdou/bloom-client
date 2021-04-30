import React from 'react';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import Form from '@components/organisms/Form/Form';
import { FormItemData } from '@components/organisms/Form/Form.types';
import { parseValue } from '@components/organisms/Form/Form.util';
import FormHeader from '@components/organisms/Form/FormHeader';
import FormItem from '@components/organisms/Form/FormItem';
import FormSubmitButton from '@components/organisms/Form/FormSubmitButton';
import Modal from '@components/organisms/Modal/Modal';
import { QuestionType } from '@util/constants';
import { IMemberValue } from '@util/constants.entities';
import useUpdateMemberValues from './useUpdateMemberValues';

interface GetMemberValuesByMemberIdResult {
  memberValues: IMemberValue[];
}

const GET_MEMBER_VALUES_BY_MEMBER_ID: DocumentNode = gql`
  query GetMemberValuesByMemberId($memberId: String!) {
    memberId @client @export(as: "memberId")

    memberValues(
      where: {
        memberId: { _eq: $memberId }
        question: { category: { _is_null: true } }
      }
      order_by: { question: { rank: asc } }
    ) {
      id
      value

      question {
        category
        description
        id
        options
        required
        title
        type
      }
    }
  }
`;

const UpdateMembershipInformationModal: React.FC = () => {
  const { data, loading } = useQuery<GetMemberValuesByMemberIdResult>(
    GET_MEMBER_VALUES_BY_MEMBER_ID
  );

  const updateMemberValues = useUpdateMemberValues();

  const memberValues: IMemberValue[] = data?.memberValues;

  if (loading) return null;

  const items: FormItemData[] = memberValues?.map(
    (memberValue: IMemberValue) => {
      let parsedValue: string | string[] = memberValue.value;

      if (memberValue.question.type === QuestionType.MULTIPLE_SELECT) {
        parsedValue = memberValue.value?.split(',');
      }

      if (
        memberValue.question.type === QuestionType.MULTIPLE_CHOICE &&
        memberValue.question.options?.length >= 5
      ) {
        parsedValue = parseValue(parsedValue);
      }

      return { ...memberValue.question, value: parsedValue };
    }
  );

  return (
    <Modal>
      <Form onSubmit={updateMemberValues}>
        <FormHeader title="Edit Membership Information" />

        {items.map(({ id, ...item }) => (
          <FormItem key={id} questionId={id} {...item} />
        ))}

        <FormSubmitButton loadingText="Saving...">Save</FormSubmitButton>
      </Form>
    </Modal>
  );
};

export default UpdateMembershipInformationModal;
