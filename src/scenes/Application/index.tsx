/**
 * @fileoverview Scene: Application
 * - Users will sign up to be a member of an organization here.
 * @author Rami Abdou
 */

import './Application.scss';

import { useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';

import { GET_MEMBERSHIP_FORM } from './ApplicationGQL';
import { useApplication } from './ApplicationState';
import SignupForm from './components/MembershipForm';

// -----------------------------------------------------------------------------

type ApplicationProps = { match: { params: { community: string } } };

export default ({ match }: ApplicationProps) => {
  const { setApplication } = useApplication();
  const { community } = match.params;

  const { data } = useQuery(GET_MEMBERSHIP_FORM, {
    variables: { encodedUrlName: community }
  });

  useEffect(() => {
    if (!data?.getCommunity) return;
    setApplication(data.getCommunity.application);
  }, [data]);

  return <SignupForm />;
};
