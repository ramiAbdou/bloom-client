import React from 'react';

import Form from '@organisms/Form/Form';
import { FormItemData } from '@organisms/Form/Form.types';
import { parseValue } from '@organisms/Form/Form.util';
import FormHeader from '@organisms/Form/FormHeader';
import FormItem from '@organisms/Form/FormItem';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import { IMemberValue, IQuestion } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { QuestionType } from '@util/constants';
import { sortObjects } from '@util/util';
import useUpdateMemberValues from './useUpdateMemberValues';

const ProfileMembershipForm: React.FC = () => {
  const items: FormItemData[] = useStoreState(({ db }) => {
    const questions: IQuestion[] = db.community.questions
      ?.map((questionId: string) => db.byQuestionId[questionId])
      ?.sort((a, b) => sortObjects(a, b, 'rank', 'ASC'))
      .filter((question: IQuestion) => !question.category);

    const data: IMemberValue[] = db.member.values?.map(
      (valueId: string) => db.byValuesId[valueId]
    );

    return questions?.map((question: IQuestion) => {
      const { id, options, type } = question;

      const value: any = data?.find(
        (entity: IMemberValue) => entity?.question === id
      )?.value;

      let parsedValue: any = value;

      if (type === QuestionType.MULTIPLE_SELECT) {
        parsedValue = value?.split(',');
      }

      if (type === QuestionType.MULTIPLE_CHOICE && options?.length >= 5) {
        parsedValue = parseValue(parsedValue);
      }

      return { ...question, value: parsedValue };
    });
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
