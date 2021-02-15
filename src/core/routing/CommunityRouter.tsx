import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import useLoader from '@organisms/Loader/useLoader';
import Application from '@scenes/Application/Application';
import IndividualEvent from '@scenes/Events/IndividualEvent/IndividualEvent';
import { useStoreState } from '@store/Store';
import useFinalPath from '../hooks/useFinalPath';
import AuthenticatedRouter from './AuthenticatedRouter';
import useInitUser from './useInitUser';

/**
 * Core routing logic of the entire application. Nested logic should live
 * within each of the high level components. The Home route should have the
 * most nested logic within it.
 */
const CommunityRouter: React.FC = () => {
  const isAuthenticated = useStoreState(({ db }) => db.isAuthenticated);
  const finalPath = useFinalPath();

  const { url } = useRouteMatch();
  const loading = useInitUser();

  useLoader(loading);

  if (loading) return null;

  return (
    <Switch>
      {!isAuthenticated && !['past', 'upcoming'].includes(finalPath) && (
        <Route
          exact
          component={IndividualEvent}
          path={`${url}/events/:eventId`}
        />
      )}

      <Route component={Application} path={`${url}/apply`} />
      <Route component={AuthenticatedRouter} path={url} />
      <Redirect to="/" />
    </Switch>
  );
};

export default CommunityRouter;
