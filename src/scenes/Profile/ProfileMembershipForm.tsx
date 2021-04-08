import React from 'react';

import { IMember, IMemberValue } from '@db/db.entities';
import useFindOne from '@gql/useFindOne';
import Form from '@organisms/Form/Form';
import { FormItemData } from '@organisms/Form/Form.types';
import { parseValue } from '@organisms/Form/Form.util';
import FormHeader from '@organisms/Form/FormHeader';
import FormItem from '@organisms/Form/FormItem';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import { useStoreState } from '@store/Store';
import { QuestionCategory, QuestionType } from '@util/constants';
import useUpdateMemberValues from './useUpdateMemberValues';

const ProfileMembershipForm: React.FC = () => {
  const memberId: string = useStoreState(({ db }) => db.memberId);

  const { memberValues } = useFindOne(IMember, {
    fields: [
      'memberValues.id',
      'memberValues.question.category',
      'memberValues.question.description',
      'memberValues.question.id',
      'memberValues.question.options',
      'memberValues.question.rank',
      'memberValues.question.required',
      'memberValues.question.title',
      'memberValues.question.type',
      'memberValues.value'
    ],
    where: { id: memberId }
  });

  const items: FormItemData[] = memberValues
    ?.filter(
      (memberValue: IMemberValue) =>
        !memberValue.question.category ||
        memberValue.question.category === QuestionCategory.GENDER
    )
    ?.sort((a: IMemberValue, b: IMemberValue) => {
      if (a.question.rank < b.question.rank) return -1;
      if (a.question.rank > b.question.rank) return 1;
      return 0;
    })
    ?.map((memberValue: IMemberValue) => {
      let parsedValue: any = memberValue.value;

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
    });

  const updateMemberValues = useUpdateMemberValues();

  return (
    <Form onSubmit={updateMemberValues}>
      <FormHeader title="Edit Membership Information" />

      {items?.map(({ id, ...item }) => (
        <FormItem key={id} questionId={id} {...item} />
      ))}

      <FormSubmitButton loadingText="Saving...">Save</FormSubmitButton>
    </Form>
  );
};

export default ProfileMembershipForm;
