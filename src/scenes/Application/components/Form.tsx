import { useMutation, useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import PrimaryButton from '@components/Button/PrimaryButton';
import Form, {
  formatQuestions,
  formModel,
  parseValue
} from '@components/Form/Form.store';
import FormContent from '@components/Form/FormContent';
import FullScreenLoader from '@components/Loader/FullScreenLoader';
import ErrorMessage from '@components/Misc/ErrorMessage';
import { EncodedUrlNameParams } from '@constants';
import { IQuestion } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { getGraphQLError } from '@util/util';
import { APPLY_FOR_MEMBERSHIP, GET_MEMBERSHIP_FORM } from '../Application.gql';
import Application from '../Application.store';

const SubmitButton = () => {
  const storedEmail = Application.useStoreState((store) => store.email);
  const setEmail = Application.useStoreActions((store) => store.setEmail);
  const name = useStoreState(({ db }) => db.community?.encodedUrlName);
  const isCompleted = Form.useStoreState((store) => store.isCompleted);

  const dataToSubmit = Form.useStoreState(({ items }) =>
    items.map(({ id, value }) => ({
      questionId: id,
      value: parseValue(value)
    }))
  );

  const email = Form.useStoreState(
    ({ items }) =>
      items.filter(({ category }) => category === 'EMAIL')[0]?.value
  );

  useEffect(() => {
    if (email !== storedEmail) setEmail(email);
  }, [email]);

  const [applyForMember, { error, data, loading }] = useMutation(
    APPLY_FOR_MEMBERSHIP,
    {
      variables: { data: dataToSubmit, email, encodedUrlName: name }
    }
  );

  const message = getGraphQLError(error);

  if (data && !error && !loading) {
    return <Redirect push to={`/${name}/apply/confirmation`} />;
  }

  return (
    <>
      <ErrorMessage marginBottom={-24} message={message} />

      <PrimaryButton
        large
        className="s-signup-submit-btn"
        disabled={!isCompleted}
        loading={loading}
        loadingText="Submitting..."
        title="Submit Application"
        onClick={applyForMember}
      />
    </>
  );
};

export default () => {
  const { encodedUrlName } = useParams() as EncodedUrlNameParams;
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const logoUrl = useStoreState(({ db }) => db.community?.logoUrl);
  const title = useStoreState(({ db }) => db.community?.applicationTitle);

  const description = useStoreState(
    ({ db }) => db.community?.applicationDescription
  );

  const questions: IQuestion[] = useStoreState(({ db }) => {
    const { community } = db;
    const { byId } = db.entities.questions;
    if (!community?.questions?.length) return [];
    const { questions: result } = db.community;

    return result.map((id: string) => byId[id]);
  });

  const { data, loading, error } = useQuery(GET_MEMBERSHIP_FORM, {
    variables: { encodedUrlName }
  });

  useEffect(() => {
    const { getApplication: result } = data || {};
    if (!result) return;

    mergeEntities({
      data: {
        ...result,
        applicationDescription: result.application.description,
        applicationTitle: result.application.title,
        questions: result.application.questions
      },
      schema: Schema.COMMUNITY,
      setActiveId: true
    });
  }, [data]);

  if (error) return <Redirect to="/login" />;
  if (loading) return <FullScreenLoader />;
  if (!questions.length) return null;

  return (
    <Form.Provider
      runtimeModel={{ ...formModel, items: formatQuestions(questions) }}
    >
      <div className="s-signup">
        <img src={logoUrl} />
        <h1>{title}</h1>
        <p>{description}</p>
        <FormContent />
        <SubmitButton />
      </div>
    </Form.Provider>
  );
};
