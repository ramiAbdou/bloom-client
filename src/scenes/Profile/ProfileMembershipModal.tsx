import React from 'react';

import { ModalType } from '@constants';
import Form from '@organisms/Form/Form';
import { parseValue } from '@organisms/Form/Form.util';
import FormHeader from '@organisms/Form/FormHeader';
import FormItem from '@organisms/Form/FormItem';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import Modal from '@organisms/Modal/Modal';
import { IMemberData, IQuestion } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import useUpdateMemberData from './useUpdateMemberData';

const ProfileMembershipForm: React.FC = () => {
  const items = useStoreState(({ db }) => {
    const questions: IQuestion[] = db.community.questions
      ?.map((questionId: string) => db.byQuestionId[questionId])
      .filter((question: IQuestion) => !question.onlyInApplication)
      .filter((question: IQuestion) => !question.category);

    return questions?.map((question: IQuestion) => {
      const { id, options, type } = question;

      const data: IMemberData = Object.values(db.byDataId).find(
        (element: IMemberData) => element.question === id
      );

      const value =
        type === 'MULTIPLE_SELECT' ||
        (type === 'MULTIPLE_CHOICE' && options?.length >= 5)
          ? parseValue(data?.value)
          : data?.value;

      return { ...question, value };
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

const ProfileMembershipModal: React.FC = () => {
  return (
    <Modal id={ModalType.EDIT_MEMBERSHIP_INFORMATION}>
      <ProfileMembershipForm />
    </Modal>
  );
};

export default ProfileMembershipModal;
