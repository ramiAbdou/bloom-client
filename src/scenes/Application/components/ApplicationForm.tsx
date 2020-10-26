/**
 * @fileoverview Component: MembershipForm
 * @author Rami Abdou
 */

import { useMutation, useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { PrimaryButton } from '@components/Button';
import Form from '@components/Form/Form.store';
import FormContent from '@components/Form/FormContent';
import Loader from '@components/Loader/Loader';
import ErrorMessage from '@components/Misc/ErrorMessage';
import { ApplicationParams } from '@constants';
import { getGraphQLError } from '@util/util';
import { APPLY_FOR_MEMBERSHIP, GET_MEMBERSHIP_FORM } from '../Application.gql';
import Application from '../Application.store';

const Title = () => {
  const title = Application.useStoreState(
    (store) => store.community?.application?.title
  );

  return <h3 className="s-signup-title"> {title}</h3>;
};

const Description = () => {
  const description = Application.useStoreState(
    (store) => store.community?.application?.description
  );

  return <p className="s-signup-desc"> {description}</p>;
};

const SubmitButton = () => {
  const encodedUrlName = Application.useStoreState(
    (store) => store.community?.encodedUrlName
  );

  const isCompleted = Form.useStoreState((store) => store.isCompleted);
  const submittableData = Form.useStoreState((store) => store.data);
  const email = Form.useStoreState(
    ({ items }) =>
      items.filter(({ category }) => category === 'EMAIL')[0]?.value
  );

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
        title="Submit Application"
        onClick={applyForMembership}
      />
    </>
  );
};

export default () => {
  const { encodedUrlName } = useParams() as ApplicationParams;

  const application = Application.useStoreState(
    (store) => store.community?.application
  );

  const initCommunity = Application.useStoreActions(
    (store) => store.initCommunity
  );

  const { data, loading, error } = useQuery(GET_MEMBERSHIP_FORM, {
    variables: { encodedUrlName }
  });

  useEffect(() => {
    if (data && !application) initCommunity(data.getCommunity);
  }, [data]);

  if (error) return <Redirect to="/login" />;
  if (loading) return <Loader />;
  if (application)
    return (
      <Form.Provider initialData={{ questions: application.questions }}>
        <div className="s-signup">
          <Title />
          <Description />
          <FormContent />
          <SubmitButton />
        </div>
      </Form.Provider>
    );

  return null;
};
