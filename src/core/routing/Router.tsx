import LoginRoute from 'core/routing/LoginRoute';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Show from '@containers/Show';
import useLoader from '@organisms/Loader/useLoader';
import Application from '@scenes/Application/Application';
import HomeRoute from './HomeRoute';
import useInitRouter from './useInitRouter';

/**
 * Core routing logic of the entire application. Nested logic should live
 * within each of the high level components. The Home route should have the
 * most nested logic within it.
 */
const Router: React.FC = () => {
  const loading = useInitRouter();
  useLoader(loading);

  return (
    <Show show={!loading}>
      <Switch>
        <LoginRoute path="/login" />
        <Route component={Application} path="/:urlName/apply" />
        <Route component={HomeRoute} path="/:urlName" />
        <Route exact component={HomeRoute} path="/" />
        <Redirect to="/login" />
      </Switch>
    </Show>
  );
};

export default Router;
