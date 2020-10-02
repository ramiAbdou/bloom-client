/**
 * @fileoverview Scene: Signup
 * - Users will sign up to be a member of an organization here.
 * @author Rami Abdou
 */

import './Signup.scss';

import React from 'react';

import SignupForm from './components/MembershipForm';
import SignupProvider from './Signup.state';

// -----------------------------------------------------------------------------

type SignupProps = { match: { params: { community: string } } };

export default ({ match }: SignupProps) => {
  const { community } = match.params;

  return (
    <SignupProvider community={community}>
      <SignupForm />
    </SignupProvider>
  );
};
