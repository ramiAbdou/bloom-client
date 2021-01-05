import React from 'react';

import Separator from '@atoms/Separator';
import Logo from '@components/Misc/Logo';
import Network from '@components/Misc/Network';
import LoginCardEmailForm from './EmailForm';
import LoginCardGoogleContainer from './GoogleForm';

const LoginCardHeader: React.FC = () => (
  <div className="s-login-header">
    <div>
      <h3>Welcome to</h3>
      <Logo multiplier={1.25} />
    </div>

    <Network style={{ height: 151 }} />
  </div>
);

const LoginCard: React.FC = () => (
  <>
    <LoginCardHeader />
    <LoginCardGoogleContainer />
    <Separator />
    <LoginCardEmailForm />
  </>
);

export default LoginCard;
