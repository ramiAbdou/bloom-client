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
  const title = useStoreState(({ db }) => db.community?.applicationTitle);

  const description = useStoreState(
    ({ db }) => db.community?.applicationDescription
  );

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
    const { byId } = db.entities.questions;
    return db.community?.questions?.map((id: string) => byId[id]);
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
