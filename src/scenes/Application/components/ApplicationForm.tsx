/**
 * @fileoverview Component: MembershipForm
 * @author Rami Abdou
 */

import { useMutation, useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import PrimaryButton from '@components/Button/PrimaryButton';
import Form from '@components/Form/Form.store';
import FormContent from '@components/Form/FormContent';
import FullScreenLoader from '@components/Loader/FullScreenLoader';
import ErrorMessage from '@components/Misc/ErrorMessage';
import { EncodedUrlNameParams } from '@constants';
import { usePrevious } from '@hooks/usePrevious';
import { Community, IApplicationQuestion } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { getGraphQLError } from '@util/util';
import { APPLY_FOR_MEMBERSHIP, GET_MEMBERSHIP_FORM } from '../Application.gql';
import Application from '../Application.store';

const Icon = () => {
  const logoUrl = useStoreState(({ community }) => community?.logoUrl);
  return <img src={logoUrl} />;
};

const Title = () => {
  const title = useStoreState(({ community }) => community?.applicationTitle);
  return <h1>{title}</h1>;
};

const Description = () => {
  const description = useStoreState(
    ({ community }) => community?.applicationDescription
  );

  return <p>{description}</p>;
};

const SubmitButton = () => {
  const setEmail = Application.useStoreActions((actions) => actions.setEmail);
  const name = useStoreState(({ community }) => community?.encodedUrlName);
  const isCompleted = Form.useStoreState((store) => store.isCompleted);
  const submittableData = Form.useStoreState((store) => store.data);
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
      variables: { data: submittableData, email, encodedUrlName: name }
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
  const updateEntities = useStoreActions((store) => store.updateEntities);

  const questions: IApplicationQuestion[] = useStoreState(
    ({ community, applicationQuestions }) => {
      if (!community?.applicationQuestions?.length) return [];
      const { applicationQuestions: result } = community;
      return result.map((id: string) => applicationQuestions.byId[id]);
    }
  );

  const { data, loading, error } = useQuery(GET_MEMBERSHIP_FORM, {
    variables: { encodedUrlName }
  });

  useEffect(() => {
    const { getMembershipForm: result } = data || {};
    if (!result) return;

    updateEntities({
      data: {
        ...result,
        applicationDescription: result.application.description,
        applicationQuestions: result.application.questions,
        applicationTitle: result.application.title
      },
      schema: Community
    });
  }, [data]);

  if (error) return <Redirect to="/login" />;
  if (loading) return <FullScreenLoader />;
  if (!questions.length) return null;

  return (
    <Form.Provider initialData={{ questions }}>
      <div className="s-signup">
        <Icon />
        <Title />
        <Description />
        <FormContent />
        <SubmitButton />
      </div>
    </Form.Provider>
  );
};
