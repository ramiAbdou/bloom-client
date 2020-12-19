import React from 'react';

import FormContent from '@components/Form/Content';
import Form from '@components/Form/Form';
import FormStore from '@components/Form/Form.store';
import FullScreenLoader from '@components/Loader/FullScreenLoader';
import ErrorMessage from '@components/Misc/ErrorMessage';
import { IQuestion } from '@store/entities';
import { useStoreState } from '@store/Store';
import SubmitButton from './SubmitButton';
import useApplyForMembership from './useApplyForMembership';
import useFetchApplication from './useFetchApplication';

const Content = () => {
  const logoUrl = useStoreState(({ db }) => db.community?.logoUrl);
  const title = useStoreState(({ db }) => db.community?.applicationTitle);

  const description = useStoreState(
    ({ db }) => db.community?.applicationDescription
  );

  const errorMessage = FormStore.useStoreState((store) => store.errorMessage);
  const applyForMembership = useApplyForMembership();

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    applyForMembership();
  };

  return (
    <form className="s-signup" onSubmit={onFormSubmit}>
      <img src={logoUrl} />
      <h1>{title}</h1>
      <p>{description}</p>
      <FormContent />
      <ErrorMessage marginBottom={-24} message={errorMessage} />
      <SubmitButton />
    </form>
  );
};

export default () => {
  const questions: IQuestion[] = useStoreState(({ db }) => {
    const { community } = db;
    const { byId } = db.entities.questions;
    if (!community?.questions?.length) return [];
    return db.community.questions?.map((id: string) => byId[id]);
  });

  const isFetchingApplication = useFetchApplication();

  if (isFetchingApplication) return <FullScreenLoader />;
  if (!questions.length) return null;

  return (
    <Form questions={questions}>
      <Content />
    </Form>
  );
};
