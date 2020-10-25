/**
 * @fileoverview Scene: Application
 * - Users will sign up to be a member of an organization here.
 * @author Rami Abdou
 */

import './Application.scss';

import { useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';

import { GET_MEMBERSHIP_FORM } from './Application.gql';
import ApplicationProvider, { useApplication } from './Application.state';
import SignupForm from './components/MembershipForm';

// -----------------------------------------------------------------------------

type ApplicationProps = { match: { params: { encodedUrlName: string } } };

const ApplicationContent = ({ match }: ApplicationProps) => {
  const { setApplication } = useApplication();
  const { encodedUrlName } = match.params;

  const { data } = useQuery(GET_MEMBERSHIP_FORM, {
    variables: { encodedUrlName }
  });

  useEffect(() => {
    if (!data?.getCommunity) return;
    setApplication(data.getCommunity.application);
  }, [data]);

  return <SignupForm />;
};

export default (props: ApplicationProps) => (
  <ApplicationProvider>
    <ApplicationContent {...props} />
  </ApplicationProvider>
);
