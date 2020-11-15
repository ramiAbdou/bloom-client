/**
 * @fileoverview Scene: LoginCard
 * @author Rami Abdou
 */

import React from 'react';

import Logo from '@components/Logo/Logo';
import Network from '@components/Misc/Network';
import Separator from '@components/Misc/Separator';
import EmailContainer from './EmailContainer';
import GoogleContainer from './GoogleContainer';

const LoginHeader = () => (
  <div className="s-login-header">
    <div>
      <h3>Welcome to</h3>
      <Logo multiplier={1.25} />
    </div>

    <Network />
  </div>
);

export default () => (
  <>
    <LoginHeader />
    <GoogleContainer />
    <Separator />
    <EmailContainer />
  </>
);
