import LoginRoute from 'core/routing/LoginRoute';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Show from '@containers/Show';
import Application from '@scenes/Application/Application';
import IndividualEvent from '@scenes/Events/IndividualEvent/IndividualEvent';
import { useStoreState } from '@store/Store';
import useFinalPath from '../hooks/useFinalPath';
import HomeRoute from './HomeRoute';
import useIsAuthenticated from './useIsAuthenticated';

/**
 * Core routing logic of the entire application. Nested logic should live
 * within each of the high level components. The Home route should have the
 * most nested logic within it.
 */
const Router: React.FC = () => {
  const isAuthenticated = useStoreState(({ db }) => db.isAuthenticated);
  const loading = useIsAuthenticated();
  const finalPath = useFinalPath();

  return (
    <Show show={!loading}>
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
        <Route component={HomeRoute} path="/:urlName" />
        <Route exact component={HomeRoute} path="/" />
        <Redirect to="/login" />
      </Switch>
    </Show>
  );
};

export default Router;
