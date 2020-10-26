/**
 * @fileoverview Scene: Login
 * @author Rami Abdou
 */

import { motion } from 'framer-motion';
import React from 'react';

import { check } from '@components/Toast/images';
import Login from '../Login.store';

const Icon = () => (
  <div className="s-login-confirmation-icon">
    <img alt="Check Mark" src={check} />
  </div>
);

const Content = () => {
  const email = Login.useStoreState((store) => store.email);
  return (
    <p>
      We sent a temporary login link to <span>{email}</span> that expires in 5
      minutes. You may now close this page.
    </p>
  );
};

export default () => (
  <motion.div
    animate={{ y: 0 }}
    className="s-login-confirmation"
    initial={{ y: 50 }}
    transition={{ duration: 0.2 }}
  >
    <Icon />
    <Content />
  </motion.div>
);
