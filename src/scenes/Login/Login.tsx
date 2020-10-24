/**
 * @fileoverview Scene: Login
 * @author Rami Abdou
 */

import './Login.scss';

import React from 'react';

import Separator from '@components/Misc/Separator';
import GoogleContainer from './components/GoogleContainer';
import LinkSentConfirmation from './components/LinkSentConfirmation';
import LoginLinkContainer from './components/LoginLinkContainer';
import LoginProvider, { useLogin } from './Login.state';

const LoginCard = () => {
  const { hasLoginLinkSent } = useLogin();

  return (
    <div className="s-login-card">
      {hasLoginLinkSent ? (
        <LinkSentConfirmation />
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
