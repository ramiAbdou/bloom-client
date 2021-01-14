import React from 'react';

import FormErrorMessage from '@organisms/Form/FormErrorMessage';
import FormItem from '@organisms/Form/FormItem';
import FormPage from '@organisms/Form/FormPage';
import SubmitButton from '@organisms/Form/FormSubmitButton';
import { IQuestion } from '@store/entities';
import { useStoreState } from '@store/Store';

const ApplicationMembershipPage: React.FC = () => {
  const questions: IQuestion[] = useStoreState(({ db }) => {
    const { byId: byQuestionId } = db.entities.questions;
    return db.community?.questions
      ?.map((questionId: string) => byQuestionId[questionId])
      ?.filter((question: IQuestion) => question.inApplication);
  });

  return (
    <FormPage id="APPLICATION">
      {questions?.map((props) => (
        <FormItem key={props.id} {...props} />
      ))}

      <FormErrorMessage marginBottom={-24} />

      <SubmitButton loadingText="Submitting...">
        Submit Application
      </SubmitButton>
    </FormPage>
  );
};

export default ApplicationMembershipPage;
