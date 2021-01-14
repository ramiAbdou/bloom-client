import React from 'react';

import { ModalType } from '@constants';
import Form from '@organisms/Form/Form';
import FormErrorMessage from '@organisms/Form/FormErrorMessage';
import FormItem from '@organisms/Form/FormItem';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import Modal from '@organisms/Modal/Modal';
import ModalContentContainer from '@organisms/Modal/ModalContentContainer';
import { IMemberData, IQuestion } from '@store/entities';
import { useStoreState } from '@store/Store';
import useUpdateMemberData from './useUpdateMemberData';

const ProfileMembershipModal: React.FC = () => {
  const items = useStoreState(({ db }) => {
    const { byId: byDataId } = db.entities.data;
    const { byId: byQuestionId } = db.entities.questions;

    const questions: IQuestion[] = db.community.questions
      ?.map((questionId: string) => byQuestionId[questionId])
      .filter((question: IQuestion) => !question.onlyInApplication)
      .filter((question: IQuestion) => !question.category);

    return questions?.map((question: IQuestion) => {
      const { id, options, type } = question;

      const data: IMemberData = Object.values(byDataId).find(
        (element: IMemberData) => element.question === id
      );

      let value = data?.value;

      if (
        (type === 'MULTIPLE_SELECT' ||
          (type === 'MULTIPLE_CHOICE' && options?.length >= 5)) &&
        value &&
        !Array.isArray(value)
      ) {
        value = value ? value.split(',') : [];
      }

      return { ...question, id: data?.id, value };
    });
  });

  const updateMemberData = useUpdateMemberData();

  return (
    <Modal id={ModalType.EDIT_MEMBERSHIP_INFORMATION}>
      <h1>Edit Membership Information</h1>

      <Form onSubmit={updateMemberData}>
        <ModalContentContainer>
          {items?.map((item) => {
            return <FormItem key={item.id} {...item} />;
          })}
        </ModalContentContainer>

        <FormErrorMessage />
        <FormSubmitButton stickToBottom>Save</FormSubmitButton>
      </Form>
    </Modal>
  );
};

export default ProfileMembershipModal;
