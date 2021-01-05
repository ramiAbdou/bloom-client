import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import Card from '@components/Elements/Card/Card';
import LoginCard from './LoginCard/LoginCard';
import LoginConfirmation from './LoginConfirmation';

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
