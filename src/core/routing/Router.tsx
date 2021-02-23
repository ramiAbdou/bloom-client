import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import CommunityRouter from './CommunityRouter';
import LoginRoute from './LoginRoute';
import useGetTokens from './useGetTokens';

/**
 * Core routing logic of the entire application. Nested logic should live
 * within each of the high level components. The Home route should have the
 * most nested logic within it.
 */
const Router: React.FC = () => {
  const loading = useGetTokens();
  if (loading) return null;

  return (
    <Switch>
      <LoginRoute exact path="/login" />
      <Route component={CommunityRouter} path="/:urlName" />
      <Route exact component={CommunityRouter} path="/" />
      <Redirect to="/login" />
    </Switch>
  );
};

export default Router;
