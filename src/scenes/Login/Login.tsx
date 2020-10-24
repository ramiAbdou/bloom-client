/**
 * @fileoverview Scene: Login
 * @author Rami Abdou
 */

import './Login.scss';

import Cookies from 'js-cookie';
import React from 'react';

import Logo from '@components/Logo/Logo';
import GoogleButton from './components/GoogleButton';

const LoginCard = () => {
  const errorMessage =
    Cookies.get('LOGIN_ERROR') === 'user_not_found'
      ? 'You must be accepted into a community before attempting to login.'
      : '';

  return (
    <div className="s-login-card">
      <GoogleButton />
      {!!errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default () => (
  <div className="s-login">
    <Logo large className="s-login-logo" />
    <h3 className="s-login-title">Log In to Bloom</h3>
    <LoginCard />
  </div>
);
