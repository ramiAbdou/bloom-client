import React from 'react';

import Form from '@organisms/Form/Form';
import FormErrorMessage from '@organisms/Form/FormErrorMessage';
import FormItem from '@organisms/Form/FormItem';
import SubmitButton from '@organisms/Form/FormSubmitButton';
import { IQuestion } from '@store/entities';
import { useStoreState } from '@store/Store';
import useApplyForMembership from './useApplyForMembership';

const ApplicationFormHeader: React.FC = () => {
  const logoUrl = useStoreState(({ db }) => db.community?.logoUrl);

  const title = useStoreState(({ db }) => {
    const { byId: byApplicationId } = db.entities.applications;
    return byApplicationId[db.community?.application]?.title;
  });

  const description = useStoreState(({ db }) => {
    const { byId: byApplicationId } = db.entities.applications;
    return byApplicationId[db.community?.application]?.description;
  });

  return (
    <>
      <img src={logoUrl} />
      <h1>{title}</h1>
      <p>{description}</p>
    </>
  );
};

const ApplicationFormContent: React.FC = () => {
  const questions: IQuestion[] = useStoreState(({ db }) => {
    const { byId: byQuestionId } = db.entities.questions;
    return db.community?.questions
      ?.map((questionId: string) => byQuestionId[questionId])
      ?.filter((question: IQuestion) => question.inApplication);
  });

  return (
    <>
      <ApplicationFormHeader />

      {questions?.map((props) => (
        <FormItem key={props.id} {...props} />
      ))}

      <FormErrorMessage marginBottom={-24} />
      <SubmitButton loadingText="Submitting...">
        Submit Application
      </SubmitButton>
    </>
  );
};

const ApplicationForm: React.FC = () => {
  const applyForMembership = useApplyForMembership();

  return (
    <div className="s-application-ctr">
      <Form className="s-application" onSubmit={applyForMembership}>
        <ApplicationFormContent />
      </Form>
    </div>
  );
};

export default ApplicationForm;
