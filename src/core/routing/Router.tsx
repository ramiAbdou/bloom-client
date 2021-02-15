import LoginRoute from 'core/routing/LoginRoute';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Application from '@scenes/Application/Application';
import IndividualEvent from '@scenes/Events/IndividualEvent/IndividualEvent';
import { useStoreState } from '@store/Store';
import useFinalPath from '../hooks/useFinalPath';
import AuthenticatedRoute from './AuthenticatedRoute';

/**
 * Core routing logic of the entire application. Nested logic should live
 * within each of the high level components. The Home route should have the
 * most nested logic within it.
 */
const Router: React.FC = () => {
  const isMember = useStoreState(({ db }) => db.isMember);
  const finalPath = useFinalPath();

  return (
    <Switch>
      <LoginRoute path="/login" />

      {!isMember && !['past', 'upcoming'].includes(finalPath) && (
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
