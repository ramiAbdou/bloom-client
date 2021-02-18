import React from 'react';

import { QuestionType } from '@constants';
import Form from '@organisms/Form/Form';
import { FormItemData } from '@organisms/Form/Form.types';
import { parseValue } from '@organisms/Form/Form.util';
import FormHeader from '@organisms/Form/FormHeader';
import FormItem from '@organisms/Form/FormItem';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import { IMemberData, IQuestion } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import useUpdateMemberData from './useUpdateMemberData';

const ProfileMembershipForm: React.FC = () => {
  const items: FormItemData[] = useStoreState(({ db }) => {
    const questions: IQuestion[] = db.community.questions
      ?.map((questionId: string) => db.byQuestionId[questionId])
      .filter((question: IQuestion) => !question.adminOnly)
      .filter((question: IQuestion) => !question.category);

    const data: IMemberData[] = db.member.data?.map((dataId: string) => {
      return db.byDataId[dataId];
    });

    return questions?.map((question: IQuestion) => {
      const { id, options, type } = question;

      const value: any = data?.find(
        (entity: IMemberData) => entity?.question === id
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

  const updateMemberData = useUpdateMemberData();

  return (
    <Form onSubmit={updateMemberData}>
      <FormHeader title="Edit Membership Information" />

      {items?.map(({ id, ...item }) => {
        return <FormItem key={id} questionId={id} {...item} />;
      })}

      <FormSubmitButton loadingText="Saving...">Save</FormSubmitButton>
    </Form>
  );
};

export default ProfileMembershipForm;
