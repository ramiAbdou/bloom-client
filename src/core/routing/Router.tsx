import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import CommunityRouter from './CommunityRouter';
import LoginRoute from './LoginRoute';
import useGetTokens from './useGetTokens';
import useVerifyLoginToken from './useVerifyLoginToken';

/**
 * Core routing logic of the entire application. Nested logic should live
 * within each of the high level components. The Home route should have the
 * most nested logic within it.
 */
const Router: React.FC = () => {
  const loading1 = useGetTokens();
  const loading2 = useVerifyLoginToken();

  if (loading1 || loading2) return null;

  return (
    <Switch>
      <LoginRoute path="/login" />
      <Route component={CommunityRouter} path="/:urlName" />
      <Route exact component={CommunityRouter} path="/" />
      <Redirect to="/login" />
    </Switch>
  );
};

export default Router;
