/**
 * @fileoverview Component: Router
 * - Core routing logic of the entire application. Nested logic should live
 * within each of the high level components. The Home route should have the
 * most nested logic within it.
 * @author Rami Abdou
 */

import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import AuthenticatedRoute from '@components/Router/AuthenticatedRoute';
import LoginRoute from '@components/Router/LoginRoute';
import ApplicationPage from '@scenes/Application/Application';
import HomePage from '@scenes/Home/Home';

export default () => (
  <Router>
    <Switch>
      <LoginRoute path="/login" />
      <AuthenticatedRoute exact component={HomePage} path="/profile" />
      <Route component={ApplicationPage} path="/:encodedUrlName/apply" />
      <AuthenticatedRoute component={HomePage} path="/:encodedUrlName" />
      <AuthenticatedRoute exact path="/" />
      <Redirect to="/login" />
    </Switch>
  </Router>
);
