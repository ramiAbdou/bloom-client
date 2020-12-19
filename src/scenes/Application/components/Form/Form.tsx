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

export default () => {
  const logoUrl = useStoreState(({ db }) => db.community?.logoUrl);
  const title = useStoreState(({ db }) => db.community?.applicationTitle);

  const description = useStoreState(
    ({ db }) => db.community?.applicationDescription
  );

  const questions: IQuestion[] = useStoreState(({ db }) => {
    const { community } = db;
    const { byId } = db.entities.questions;
    if (!community?.questions?.length) return [];
    return db.community.questions?.map((id: string) => byId[id]);
  });

  const errorMessage = FormStore.useStoreState((store) => store.errorMessage);

  const isFetchingApplication = useFetchApplication();
  const applyForMembership = useApplyForMembership();

  if (isFetchingApplication) return <FullScreenLoader />;

  return (
    <Form
      className="s-signup"
      questions={questions}
      onSubmit={applyForMembership}
    >
      <img src={logoUrl} />
      <h1>{title}</h1>
      <p>{description}</p>
      <FormContent />
      <ErrorMessage marginBottom={-24} message={errorMessage} />
      <SubmitButton />
    </Form>
  );
};
