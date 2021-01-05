import React from 'react';

import Separator from '@atoms/Separator';
import Card from '@components/Elements/Card/Card';
import Logo from '@components/Misc/Logo';
import Network from '@components/Misc/Network';
import EmailContainer from './EmailContainer';
import GoogleContainer from './GoogleContainer';

const LoginHeader: React.FC = () => (
  <div className="s-login-header">
    <div>
      <h3>Welcome to</h3>
      <Logo multiplier={1.25} />
    </div>

    <Network style={{ height: 151 }} />
  </div>
);

const LoginCard: React.FC = () => (
  <Card className="s-login-card">
    <LoginHeader />
    <GoogleContainer />
    <Separator />
    <EmailContainer />
  </Card>
);

export default LoginCard;
