import React from 'react';

import DefaultFormItem from '@organisms/Form/DefaultItem';
import FormErrorMessage from '@organisms/Form/ErrorMessage';
import Form from '@organisms/Form/Form';
import FormStore from '@organisms/Form/Form.store';
import FullScreenLoader from '@components/Loader/FullScreenLoader';
import { IQuestion } from '@store/entities';
import { useStoreState } from '@store/Store';
import useApplyForMembership from './hooks/useApplyForMembership';
import useFetchApplication from './hooks/useFetchApplication';
import SubmitButton from './SubmitButton';

const FormContent = () => (
  <>
    {FormStore.useStoreState(({ items }) => items)?.map((props) => {
      return (
        <DefaultFormItem key={props.title ?? props.placeholder} {...props} />
      );
    })}
  </>
);

export default () => {
  const questions: IQuestion[] = useStoreState(({ db }) => {
    const { community } = db;
    const { byId } = db.entities.questions;
    if (!community?.questions?.length) return [];
    return db.community.questions?.map((id: string) => byId[id]);
  });

  const logoUrl = useStoreState(({ db }) => db.community?.logoUrl);
  const title = useStoreState(({ db }) => db.community?.applicationTitle);

  const description = useStoreState(
    ({ db }) => db.community?.applicationDescription
  );

  const applyForMembership = useApplyForMembership();
  const isFetchingApplication = useFetchApplication();

  if (isFetchingApplication) return <FullScreenLoader />;
  if (!questions.length) return null;

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
      <FormErrorMessage marginBottom={-24} />
      <SubmitButton />
    </Form>
  );
};
