/**
 * @fileoverview Scene: Login
 * @author Rami Abdou
 */

import React from 'react';

// import { useCookies } from 'react-cookie';
import GoogleButton from './components/GoogleButton';

type LoginProps = { location: { search: string } };

export default ({ location }: LoginProps) => {
  const params = new URLSearchParams(location.search);
  const errorMessage: string =
    params.get('err') === 'user_not_found'
      ? 'Please sign up for a community before attempting to login.'
      : '';

  console.log(params.get('token'));

  // const [cookies] = useCookies(['token']);

  // console.log(cookies);

  return (
    <div>
      <p>Sign In</p>
      <GoogleButton />
      {!!errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};