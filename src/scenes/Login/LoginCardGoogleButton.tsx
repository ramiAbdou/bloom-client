import React from 'react';

import Button from '@components/atoms/Button/Button';
import GoogleLogo from '@components/images/google.svg';
import { APP } from '@util/constants';
import { buildUrl } from '@util/util';

const LoginCardGoogleButton: React.FC = () => {
  const url: string = buildUrl('https://accounts.google.com/o/oauth2/v2/auth', {
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${APP.SERVER_URL}/google/auth`,
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/userinfo.email'
  });

  return (
    <Button
      fill
      large
      className="mo-check-in-google"
      href={url}
      openTab={false}
    >
      <GoogleLogo style={{ height: 20, width: 20 }} />
      Sign In with Google
    </Button>
  );
};

export default LoginCardGoogleButton;
