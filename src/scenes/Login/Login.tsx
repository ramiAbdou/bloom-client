/**
 * @fileoverview Scene: Login
 * @author Rami Abdou
 */

import './Login.scss';

import React from 'react';

import Logo from '@components/Logo/Logo';
import Network from '@components/Misc/Network';
import Separator from '@components/Misc/Separator';
import GoogleContainer from './components/GoogleContainer';
import LinkSentConfirmation from './components/LinkSentConfirmation';
import LoginLinkContainer from './components/LoginLinkContainer';
import Login from './Login.store';

const LoginHeader = () => (
  <div className="s-login-header">
    <div>
      <h3>Welcome to</h3>
      <Logo multiplier={1.25} />
    </div>

    <Network />
  </div>
);

const LoginDefaultContent = () => (
  <>
    <LoginHeader />
    <GoogleContainer />
    <Separator />
    <LoginLinkContainer />
  </>
);

const LoginCard = () => {
  const linkSent = Login.useStoreState((store) => store.hasLoginLinkSent);

  return (
    <div className="s-login-ctr">
      <div className="s-login-card">
        {linkSent ? <LinkSentConfirmation /> : <LoginDefaultContent />}
      </div>
    </div>
  );
};

export default () => (
  <Login.Provider>
    <LoginCard />
  </Login.Provider>
);
