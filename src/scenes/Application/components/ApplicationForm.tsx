/**
 * @fileoverview Component: MembershipForm
 * @author Rami Abdou
 */

import { useMutation, useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import PrimaryButton from '@components/Button/PrimaryButton';
import Form, { parseValue } from '@components/Form/Form.store';
import FormContent from '@components/Form/FormContent';
import FullScreenLoader from '@components/Loader/FullScreenLoader';
import ErrorMessage from '@components/Misc/ErrorMessage';
import { EncodedUrlNameParams } from '@constants';
import { usePrevious } from '@hooks/usePrevious';
import { IMembershipQuestion } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { getGraphQLError } from '@util/util';
import { APPLY_FOR_MEMBERSHIP, GET_MEMBERSHIP_FORM } from '../Application.gql';
import Application from '../Application.store';

const SubmitButton = () => {
  const setEmail = Application.useStoreActions((actions) => actions.setEmail);
  const name = useStoreState(({ community }) => community?.encodedUrlName);
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

  const previousEmail = usePrevious(email);

  useEffect(() => {
    if (email !== previousEmail) setEmail(email);
  }, [email]);

  const [applyForMembership, { error, data, loading }] = useMutation(
    APPLY_FOR_MEMBERSHIP,
    {
      variables: { data: dataToSubmit, email, encodedUrlName: name }
    }
  );

  const message = getGraphQLError(error);

  if (data && !error && !loading)
    return <Redirect push to={`/${name}/apply/confirmation`} />;

  return (
    <>
      {!!message && <ErrorMessage marginBottom={-24} message={message} />}

      <PrimaryButton
        large
        className="s-signup-submit-btn"
        disabled={!isCompleted}
        loading={loading}
        loadingText="Submitting..."
        title="Submit Application"
        onClick={applyForMembership}
      />
    </>
  );
};

export default () => {
  const { encodedUrlName } = useParams() as EncodedUrlNameParams;
  const updateEntities = useStoreActions((actions) => actions.updateEntities);
  const logoUrl = useStoreState(({ community }) => community?.logoUrl);
  const title = useStoreState(({ community }) => community?.applicationTitle);
  const description = useStoreState(
    ({ community }) => community?.applicationDescription
  );

  const questions: IMembershipQuestion[] = useStoreState(
    ({ community, entities }) => {
      const { byId } = entities.membershipQuestions;
      if (!community?.membershipQuestions?.length) return [];
      const { membershipQuestions: result } = community;
      return result.map((id: string) => byId[id]);
    }
  );

  const { data, loading, error } = useQuery(GET_MEMBERSHIP_FORM, {
    variables: { encodedUrlName }
  });

  useEffect(() => {
    const { getApplication: result } = data || {};
    if (!result) return;

    updateEntities({
      data: {
        ...result,
        applicationDescription: result.application.description,
        applicationTitle: result.application.title,
        membershipQuestions: result.application.questions
      },
      schema: Schema.COMMUNITY
    });
  }, [data]);

  if (error) return <Redirect to="/login" />;
  if (loading) return <FullScreenLoader />;
  if (!questions.length) return null;

  return (
    <Form.Provider initialData={{ questions }}>
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
