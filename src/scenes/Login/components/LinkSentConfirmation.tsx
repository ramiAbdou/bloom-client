/**
 * @fileoverview Scene: Login
 * @author Rami Abdou
 */

import { motion } from 'framer-motion';
import React from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';

import Login from '../Login.store';

const EmailContainer = () => {
  const email = Login.useStoreState((store) => store.email);
  return <p className="s-login-confirmation-email">{email}</p>;
};

const Content = () => (
  <>
    <p>We sent a temporary login link to the following email:</p>
    <EmailContainer />
    <p>
      It will expire in 5 minutes. If you have any trouble, you can request
      another login link or login with Google. You may now close this page!
    </p>
  </>
);

export default () => (
  <motion.div
    animate={{ y: 0 }}
    className="s-login-confirmation"
    initial={{ y: 50 }}
    transition={{ duration: 0.2 }}
  >
    <IoIosCheckmarkCircle />
    <Content />
  </motion.div>
);
