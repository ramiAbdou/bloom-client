import React from 'react';
import { Redirect } from 'react-router-dom';
import { userIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Card from '@components/containers/Card/Card';
import CheckInConfirmation from '@components/modals/CheckInModal/CheckInModalConfirmation';
import Story from '@components/organisms/Story/Story';
import LoginMainPage from './LoginMainPage';

const Login: React.FC = () => {
  const userId: string = useReactiveVar(userIdVar);
  if (userId) return <Redirect to="/" />;

  return (
    <div className="s-login-ctr">
      <Story>
        <Card className="s-login-card">
          <LoginMainPage />
          <CheckInConfirmation />
        </Card>
      </Story>
    </div>
  );
};

export default Login;
