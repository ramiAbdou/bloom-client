import LoginRoute from 'core/routing/LoginRoute';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Loader from '@molecules/Loader/Loader';
import Application from '@scenes/Application/Application';
import HomeRoute from './HomeRoute';
import useInitRouter from './useInitRouter';

/**
 * Core routing logic of the entire application. Nested logic should live
 * within each of the high level components. The Home route should have the
 * most nested logic within it.
 */
const RouterContent: React.FC = () => {
  const loading = useInitRouter();
  if (loading) return <Loader />;

  return (
    <Switch>
      <LoginRoute path="/login" />
      <Route component={Application} path="/:urlName/apply" />
      <Route component={HomeRoute} path="/:urlName" />
      <Route exact component={HomeRoute} path="/" />
      <Redirect to="/login" />
    </Switch>
  );
};

const Router: React.FC = () => (
  <BrowserRouter>
    <RouterContent />
  </BrowserRouter>
);

export default Router;
