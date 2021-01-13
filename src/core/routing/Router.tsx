import LoginRoute from 'core/routing/LoginRoute';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import ApplicationPage from '@scenes/Application/Application';
import HomeRouter from './HomeRouter';

/**
 * Core routing logic of the entire application. Nested logic should live
 * within each of the high level components. The Home route should have the
 * most nested logic within it.
 */
const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <LoginRoute path="/login" />
      <Route component={ApplicationPage} path="/:urlName/apply" />
      <Route component={HomeRouter} path="/:urlName" />
      <Route exact component={HomeRouter} path="/" />
      <Redirect to="/login" />
    </Switch>
  </BrowserRouter>
);

export default Router;
