import LoginRoute from 'core/routing/LoginRoute';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Application from '@scenes/Application/Application';
import IndividualEvent from '@scenes/Events/IndividualEvent/IndividualEvent';
import { useStoreState } from '@store/Store';
import useFinalPath from '../hooks/useFinalPath';
import AuthenticatedRoute from './AuthenticatedRoute';
import useIsAuthenticated from './useIsAuthenticated';

/**
 * Core routing logic of the entire application. Nested logic should live
 * within each of the high level components. The Home route should have the
 * most nested logic within it.
 */
const Router: React.FC = () => {
  const isAuthenticated = useStoreState(({ db }) => db.isAuthenticated);
  const finalPath = useFinalPath();
  const loading = useIsAuthenticated();

  if (loading) return null;

  return (
    <Switch>
      <LoginRoute path="/login" />

      {!isAuthenticated && !['past', 'upcoming'].includes(finalPath) && (
        <Route
          exact
          component={IndividualEvent}
          path="/:urlName/events/:eventId"
        />
      )}

      <Route component={Application} path="/:urlName/apply" />
      <Route component={AuthenticatedRoute} path="/:urlName" />
      <Route exact component={AuthenticatedRoute} path="/" />
      <Redirect to="/login" />
    </Switch>
  );
};

export default Router;
