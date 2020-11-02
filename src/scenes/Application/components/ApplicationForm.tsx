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
import { useStoreState } from '@store/Store';
import { getGraphQLError } from '@util/util';
import { APPLY_FOR_MEMBERSHIP, GET_MEMBERSHIP_FORM } from '../Application.gql';
import Application from '../Application.store';

const Icon = () => {
  const logoUrl = Application.useStoreState(
    ({ community }) => community?.logoUrl
  );

  return <img src={logoUrl} />;
};

const Title = () => {
  const title = Application.useStoreState(
    ({ community }) => community?.application?.title
  );

  return <h3>{title}</h3>;
};

const Description = () => {
  const description = Application.useStoreState(
    ({ community }) => community?.application?.description
  );

  return <p>{description}</p>;
};

const SubmitButton = () => {
  const setEmail = Application.useStoreActions((actions) => actions.setEmail);
  const encodedUrlName = Application.useStoreState(
    ({ community }) => community?.encodedUrlName
  );

  const primaryColor = Form.useStoreState((store) => store.primaryColor);
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
      variables: { data: submittableData, email, encodedUrlName }
    }
  );

  const message = getGraphQLError(error);

  if (data && !error && !loading)
    return <Redirect push to={`/${encodedUrlName}/apply/confirmation`} />;

  return (
    <>
      {!!message && <ErrorMessage marginBottom={-24} message={message} />}

      <PrimaryButton
        className="s-signup-submit-btn"
        disabled={!isCompleted}
        isLoading={loading}
        loadingText="Submitting..."
        primaryColor={primaryColor}
        title="Submit Application"
        onClick={applyForMembership}
      />
    </>
  );
};

export default () => {
  const { encodedUrlName } = useParams() as EncodedUrlNameParams;
  const primaryColor = useStoreState(({ community }) => community.primaryColor);
  const application = Application.useStoreState(
    ({ community }) => community?.application
  );

  const initCommunity = Application.useStoreActions(
    (actions) => actions.initCommunity
  );

  const { data, loading, error } = useQuery(GET_MEMBERSHIP_FORM, {
    variables: { encodedUrlName }
  });

  useEffect(() => {
    if (data && !application) initCommunity(data.getCommunity);
  }, [data]);

  if (error) return <Redirect to="/login" />;
  if (loading) return <FullScreenLoader />;
  if (!application) return null;

  return (
    <Form.Provider
      initialData={{ primaryColor, questions: application.questions }}
    >
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
