import LoginRoute from 'core/routing/LoginRoute';
import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import useQuery from '@hooks/useQuery';
import Loader from '@molecules/Loader/Loader';
import ApplicationPage from '@scenes/Application/Application';
import IndividualEvent from '@scenes/Events/IndividualEvent/IndividualEvent';
import { useStoreActions } from '@store/Store';
import HomeRouter from './HomeRouter';
import { IS_LOGGED_IN } from './Router.gql';

/**
 * Core routing logic of the entire application. Nested logic should live
 * within each of the high level components. The Home route should have the
 * most nested logic within it.
 */
const Router: React.FC = () => {
  const setIsAuthenticated = useStoreActions(({ db }) => db.setIsAuthenticated);

  const { loading, data: isAuthenticated } = useQuery<boolean>({
    name: 'isUserLoggedIn',
    query: IS_LOGGED_IN
  });

  useEffect(() => {
    if (isAuthenticated !== null) setIsAuthenticated(isAuthenticated);
  }, [isAuthenticated]);

  if (loading) return <Loader />;

  return (
    <BrowserRouter>
      <Switch>
        <LoginRoute path="/login" />
        <Route component={ApplicationPage} path="/:urlName/apply" />
        <Route component={IndividualEvent} path="/:urlName/events/:eventId" />
        <Route component={HomeRouter} path="/:urlName" />
        <Route exact component={HomeRouter} path="/" />
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
