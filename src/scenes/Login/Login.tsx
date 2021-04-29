import React from 'react';

import Card from '@components/containers/Card/Card';
import CheckInConfirmation from '@components/modals/CheckInModal/CheckInModalConfirmation';
import Story from '@components/organisms/Story/Story';
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
