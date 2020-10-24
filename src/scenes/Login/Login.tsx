/**
 * @fileoverview Scene: Login
 * @author Rami Abdou
 */

import './Login.scss';

import { motion } from 'framer-motion';
import React from 'react';

import Separator from '@components/Misc/Separator';
import GoogleContainer from './components/GoogleContainer';
import LoginLinkContainer from './components/LoginLinkContainer';
import LoginProvider, { useLogin } from './Login.state';

const LoginCard = () => {
  const { hasLoginLinkSent } = useLogin();

  return (
    <div className="s-login-card">
      {hasLoginLinkSent ? (
        <LinkSentConfirmationCard />
      ) : (
        <>
          <GoogleContainer />
          <Separator />
          <LoginLinkContainer />
        </>
      )}
    </div>
  );
};

const LinkSentConfirmationCard = () => (
  <motion.div
    animate={{ y: 0 }}
    initial={{ y: 50 }}
    transition={{ duration: 0.2 }}
  >
    YERRRRR
  </motion.div>
);

const LoginContent = () => {
  return (
    <div className="s-login">
      {/* <Logo large className="s-login-logo" /> */}
      {/* <h3 className="s-login-title">Log In to Bloom</h3> */}
      <LoginCard />
    </div>
  );
};

export default () => (
  <LoginProvider>
    <LoginContent />
  </LoginProvider>
);
