import { motion } from 'framer-motion';
import React from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';

import Login from '../Login.store';

const ConfirmationHeader = () => (
  <div className="s-login-confirmation-header">
    <IoCheckmarkCircle />
    <h1>Login Link Sent</h1>
  </div>
);

const Content = () => {
  const email = Login.useStoreState((store) => store.email);

  return (
    <>
      <p>We sent a temporary login link to the following email:</p>
      <p className="s-login-confirmation-email">{email}</p>
      <p>
        It will expire in 5 minutes. If you have any trouble, you can request
        another login link or login with Google. You may now close this page!
      </p>
    </>
  );
};

export default () => (
  <motion.div
    animate={{ y: 0 }}
    className="s-login-confirmation"
    initial={{ y: 50 }}
    transition={{ duration: 0.2 }}
  >
    <ConfirmationHeader />
    <Content />
  </motion.div>
);
