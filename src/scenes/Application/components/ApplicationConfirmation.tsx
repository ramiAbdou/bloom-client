/**
 * @fileoverview Component: MembershipForm
 * @author Rami Abdou
 */

import { motion } from 'framer-motion';
import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { check } from '@components/Toast/images';
import { ApplicationParams } from '@constants';
import Application from '../Application.store';

const Icon = () => (
  <div className="s-login-confirmation-icon">
    <img alt="Check Mark" src={check} />
  </div>
);

const Content = () => {
  const { encodedUrlName } = useParams() as ApplicationParams;
  const autoAccept = Application.useStoreState(
    ({ community }) => community?.autoAccept
  );
  const communityName = Application.useStoreState(
    ({ community }) => community?.name
  );

  const email = Application.useStoreState((store) => store.email);

  if (!communityName) return <Redirect to={`/${encodedUrlName}/apply`} />;
  if (!autoAccept)
    return (
      <p>
        Your application to {communityName} was received. We'll send you an
        email when you are accepted into the community.
      </p>
    );

  return (
    <p>
      Congratulations, you've been accepted into the {communityName} community!
      We just sent a temporary login link to <span>{email}</span>. You may now
      close this page.
    </p>
  );
};

export default () => (
  <div className="s-signup-confirmation-ctr">
    <motion.div
      animate={{ y: 0 }}
      className="s-signup-confirmation"
      initial={{ y: 50 }}
      transition={{ duration: 0.2 }}
    >
      <Icon />
      <Content />
    </motion.div>
  </div>
);
