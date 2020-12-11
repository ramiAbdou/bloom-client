import { motion } from 'framer-motion';
import React from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { Redirect, useParams } from 'react-router-dom';

import { EncodedUrlNameParams } from '@constants';
import { useStoreState } from '@store/Store';
import Application from '../Application.store';

const ConfirmationHeader = () => {
  const autoAccept = useStoreState(({ db }) => db.community?.autoAccept);
  return (
    <div className="s-signup-confirmation-header">
      <IoCheckmarkCircle />
      <h1>{autoAccept ? 'Application Accepted' : 'Application Received'}</h1>
    </div>
  );
};

const AutoAcceptedContent = () => {
  const email = Application.useStoreState((store) => store.email);
  const name = useStoreState(({ db }) => db.community?.name);
  return (
    <>
      <p>
        Your application to {name} was received! When you are accepted into the
        community, we'll send you an email at:
      </p>

      <p className="s-signup-confirmation-email">{email}</p>
      <p>You may now close this page.</p>
    </>
  );
};

const DefaultContent = () => {
  const email = Application.useStoreState((store) => store.email);
  const name = useStoreState(({ db }) => db.community?.name);
  return (
    <>
      <p>
        Congratulations, you've been accepted into the <span>{name}</span>
        community! We just sent a temporary login link to:
      </p>

      <p className="s-signup-confirmation-email">{email}</p>
      <p>You may now close this page.</p>
    </>
  );
};

const Content = () => {
  const { encodedUrlName } = useParams() as EncodedUrlNameParams;
  const autoAccept = useStoreState(({ db }) => db.community?.autoAccept);
  const name = useStoreState(({ db }) => db.community?.name);

  if (!name) return <Redirect to={`/${encodedUrlName}/apply`} />;
  if (!autoAccept) return <AutoAcceptedContent />;
  return <DefaultContent />;
};

export default () => (
  <div className="s-signup-confirmation-ctr">
    <motion.div
      animate={{ y: 0 }}
      className="s-signup-confirmation"
      initial={{ y: 50 }}
      transition={{ duration: 0.2 }}
    >
      <ConfirmationHeader />
      <Content />
    </motion.div>
  </div>
);
