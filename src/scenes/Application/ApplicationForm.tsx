import React from 'react';

import Form from '@organisms/Form/Form';
import FormStore from '@organisms/Form/Form.store';
import DefaultFormItem from '@organisms/Form/FormDefaultItem';
import FormErrorMessage from '@organisms/Form/FormErrorMessage';
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

const ApplicationFormContent: React.FC = () => (
  <>
    <ApplicationFormHeader />

    {FormStore.useStoreState(({ items }) => items)?.map((props) => (
      <DefaultFormItem key={props.title ?? props.placeholder} {...props} />
    ))}

    <FormErrorMessage marginBottom={-24} />
    <SubmitButton loadingText="Submitting...">Submit Application</SubmitButton>
  </>
);

const ApplicationForm: React.FC = () => {
  const questions: IQuestion[] = useStoreState(({ db }) => {
    const { byId } = db.entities.questions;
    return db.community?.questions?.map((id: string) => byId[id]);
  });

  const applyForMembership = useApplyForMembership();

  if (!questions?.length) return null;

  return (
    <div className="s-application-ctr">
      <Form
        className="s-application"
        questions={questions}
        onSubmit={applyForMembership}
      >
        <ApplicationFormContent />
      </Form>
    </div>
  );
};

export default ApplicationForm;
