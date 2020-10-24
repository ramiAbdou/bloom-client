/**
 * @fileoverview Scene: Login
 * @author Rami Abdou
 */

import { motion } from 'framer-motion';
import React from 'react';

import { check } from '@components/Toast/images';
import { useLogin } from '../Login.state';

const Content = () => {
  const { email } = useLogin();

  return (
    <p>
      We sent a login link to <span>{email}</span>. It will expire in 60
      minutes. You may now close this page.
    </p>
  );
};

const Icon = () => (
  <div className="s-login-confirmation-icon">
    <img alt="Check Mark" src={check} />
  </div>
);

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
