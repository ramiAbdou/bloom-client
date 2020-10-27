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
  <div className="s-signup-confirmation-icon">
    <img alt="Check Mark" src={check} />
  </div>
);

const EmailContainer = () => {
  const email = Application.useStoreState((store) => store.email);
  return <p className="s-signup-confirmation-email">{email}</p>;
};

const Content = () => {
  const { encodedUrlName } = useParams() as ApplicationParams;
  const autoAccept = Application.useStoreState(
    ({ community }) => community?.autoAccept
  );
  const communityName = Application.useStoreState(
    ({ community }) => community?.name
  );

  if (!communityName) return <Redirect to={`/${encodedUrlName}/apply`} />;
  if (!autoAccept)
    return (
      <>
        <p>
          Your application to <span>{communityName}</span> was received. When
          you are accepted into the community, we'll send you an email at:
        </p>

        <EmailContainer />
        <p>You may now close this page.</p>
      </>
    );

  return (
    <>
      <p>
        Congratulations, you've been accepted into the{' '}
        <span>{communityName}</span> community! We just sent a temporary login
        link to:
      </p>

      <EmailContainer />
      <p>You may now close this page.</p>
    </>
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