/**
 * @fileoverview Scene: Login
 * @author Rami Abdou
 */

import React from 'react';

import GoogleButton from './components/GoogleButton';
import MailchimpButton from './components/MailchimpButton';
import ZoomButton from './components/ZoomButton';

type LoginProps = { location: { search: string } };

export default ({ location }: LoginProps) => {
  const params = new URLSearchParams(location.search);
  const errorMessage: string =
    params.get('err') === 'user_not_found'
      ? 'Please sign up for a community before attempting to login.'
      : '';

  return (
    <div>
      <ZoomButton />
      <MailchimpButton />
      <p>Sign In</p>
      <GoogleButton />
      {!!errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};
