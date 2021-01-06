import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import Card from '@containers/Card/Card';
import ConfirmationScreen from '@containers/ConfirmationScreen/ConfirmationScreen';
import LoginCard from './LoginCard';

const LoginConfirmation: React.FC = () => (
  <ConfirmationScreen title="Login Link Sent">
    <p>
      We just sent you a temporary login link that expires in 5 minutes. If you
      have any trouble, you can request another login link or login with Google.
    </p>

    <p>You may now close this page.</p>
  </ConfirmationScreen>
);

const LoginContent: React.FC = () => {
  const { url } = useRouteMatch();

  return (
    <Card className="s-login-card">
      <Switch>
        <Route exact component={LoginCard} path={url} />

        <Route
          exact
          component={LoginConfirmation}
          path={`${url}/confirmation`}
        />

        <Redirect to={url} />
      </Switch>
    </Card>
  );
};

const Login: React.FC = () => (
  <div className="s-login-ctr">
    <LoginContent />
  </div>
);

export default Login;
