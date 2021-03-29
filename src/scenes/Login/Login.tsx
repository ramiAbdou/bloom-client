import React from 'react';

import Card from '@containers/Card/Card';
import CheckInConfirmation from '@modals/CheckIn/CheckInConfirmation';
import Story from '@organisms/Story/Story';
import LoginMainPage from './LoginMainPage';

const Login: React.FC = () => (
  <div className="s-login-ctr">
    <Story>
      <Card className="s-login-card">
        <LoginMainPage />
        <CheckInConfirmation />
      </Card>
    </Story>
  </div>
);

export default Login;
