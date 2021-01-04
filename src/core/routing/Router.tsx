import AuthenticatedRoute from 'core/routing/AuthenticatedRoute';
import LoginRoute from 'core/routing/LoginRoute';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import ApplicationPage from '@scenes/Application/Application';
import HomePage from '@scenes/Home/Home';

/**
 * Core routing logic of the entire application. Nested logic should live
 * within each of the high level components. The Home route should have the
 * most nested logic within it.
 */
const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <LoginRoute path="/login" />
      <AuthenticatedRoute exact component={HomePage} path="/profile" />
      <Route component={ApplicationPage} path="/:encodedUrlName/apply" />
      <AuthenticatedRoute component={HomePage} path="/:encodedUrlName" />
      <AuthenticatedRoute exact path="/" />
      <Redirect to="/login" />
    </Switch>
  </BrowserRouter>
);

export default Router;
