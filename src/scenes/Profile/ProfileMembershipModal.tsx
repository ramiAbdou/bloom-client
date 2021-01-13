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

    const memberData: IMemberData[] = db.member.data?.map((dataId: string) => {
      return byDataId[dataId];
    });

    return memberData?.map(
      ({ id, question: questionId, value }: IMemberData) => {
        const question: IQuestion = byQuestionId[questionId];

        if (
          question.type === 'MULTIPLE_CHOICE' &&
          value &&
          !Array.isArray(value)
        ) {
          value = value.split(',');
        }

        return { ...question, id, value };
      }
    );
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
