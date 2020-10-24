/**
 * @fileoverview Scene: Login
 * @author Rami Abdou
 */

import './Login.scss';

import React from 'react';

import Logo from '@components/Logo/Logo';
import Separator from '@components/Misc/Separator';
import GoogleContainer from './components/GoogleContainer';
import LoginLinkContainer from './components/LoginLinkContainer';

const LoginCard = () => (
  <div className="s-login-card">
    <GoogleContainer />
    <Separator />
    <LoginLinkContainer />
  </div>
);

export default () => (
  <div className="s-login">
    <Logo large className="s-login-logo" />
    <h3 className="s-login-title">Log In to Bloom</h3>
    <LoginCard />
  </div>
);
