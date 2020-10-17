/**
 * @fileoverview Scene: Signup
 * - Users will sign up to be a member of an organization here.
 * @author Rami Abdou
 */

import './Signup.scss';

import { useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';

import { useStoreActions } from '@store/Store';
import SignupForm from './components/MembershipForm';
import { GET_MEMBERSHIP_FORM } from './SignupGQL';

// -----------------------------------------------------------------------------

type SignupProps = { match: { params: { community: string } } };

export default ({ match }: SignupProps) => {
  const initCommunity = useStoreActions((store) => store.community.init);
  const { community } = match.params;

  const { data } = useQuery(GET_MEMBERSHIP_FORM, {
    variables: { encodedUrlName: community }
  });

  useEffect(() => {
    if (!data?.getCommunity) return;
    initCommunity(data.getCommunity);
  }, [data]);

  return <SignupForm />;
};
