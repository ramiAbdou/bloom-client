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

    const data: IMemberData[] = db.member.data?.map(
      (dataId: string) => db.byDataId[dataId]
    );

    return questions?.map((question: IQuestion) => {
      const { id, options, type } = question;

      const value: any = data?.find(
        (entity: IMemberData) => entity?.question === id
      )?.value;

      const parsedValue: any =
        type === 'MULTIPLE_SELECT' ||
        (type === 'MULTIPLE_CHOICE' && options?.length >= 5)
          ? parseValue(value)
          : value;

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

const ProfileMembershipModal: React.FC = () => {
  return (
    <Modal id={ModalType.EDIT_MEMBERSHIP_INFORMATION}>
      <ProfileMembershipForm />
    </Modal>
  );
};

export default ProfileMembershipModal;
