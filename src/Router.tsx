/**
 * @fileoverview Component: Router
 * - Core routing logic of the entire application. The Modal, Flow and Picker
 * provider go within the Router because we still want the useRouter hook to be
 * within scope when using those components.
 * @author Rami Abdou
 */

import { useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory
} from 'react-router-dom';

import Loader from '@components/Loader/Loader';
import SignupPage from '@scenes/Application/Application';
import HomePage from '@scenes/Home/Home';
import { VERIFY_LOGIN_TOKEN } from '@scenes/Home/Home.gql';
import LoginPage from '@scenes/Login/Login';
import { useStoreActions, useStoreState } from '@store/Store';
import { GET_USER, IS_LOGGED_IN } from '@store/UserGQL';

const Background = () => <div id="app" />;

/**
 * For an authenticated route, we first try to retrieve the user (by using the
 * token stored in the httpOnly cookies), and if the user exists, we update
 * the global state with the user.
 */
const AuthenticatedRoute = ({ component, ...rest }) => {
  const loginToken = new URLSearchParams(window.location.search).get('token');
  const { loading, data } = useQuery(GET_USER);
  const initUser = useStoreActions(({ user }) => user.init);
  const membershipsLoaded = !!useStoreState(
    ({ membership }) => membership.memberships.length
  );

  useEffect(() => {
    if (!data?.getUser) return;
    initUser(data.getUser);
  }, [data?.getUser?.id]);

  // If there are already memberships stored in the Membership state, then we
  // know that the user is loaded, so show that.
  if (loginToken) return <AuthenticatedRouteWithToken token={loginToken} />;
  if (membershipsLoaded || data?.getUser)
    return <Route exact {...rest} component={component} />;
  if (loading) return <Loader />;
  return <Redirect to="/login" />;
};

const AuthenticatedRouteWithToken = ({ token }) => {
  const { push } = useHistory();
  const { data, loading } = useQuery(VERIFY_LOGIN_TOKEN, {
    variables: { token }
  });

  // If there are already memberships stored in the Membership state, then we
  // know that the user is loaded, so show that.
  if (data?.verifyLoginToken) {
    push(window.location.pathname);
    return null;
  }
  if (loading) return <Loader />;
  return <Redirect to="/login" />;
};

/**
 * Check to see if the user is logged in (if they have tokens stored in the
 * httpOnly cookies), and if so, redirect them to the home page.
 */
const LoginRoute = ({ path }) => {
  const { error, loading, data } = useQuery(IS_LOGGED_IN);
  if (loading) return <Loader />;

  // If there is an error in the GraphQL query, whether the query structure
  // was wrong or there the user wasn't authenticated for the request.
  if (!error && data?.isUserLoggedIn) return <Redirect to="/" />;
  return <Route exact component={LoginPage} path={path} />;
};

export default () => (
  <Router>
    <Background />
    <Switch>
      <LoginRoute path="/login" />
      <AuthenticatedRoute exact component={HomePage} path="/profile" />
      <Route component={SignupPage} path="/:encodedUrlName/apply" />
      <AuthenticatedRoute
        exact
        component={HomePage}
        path="/:encodedUrlName/admin"
      />
      <AuthenticatedRoute
        exact
        component={HomePage}
        path="/:encodedUrlName/admin/members"
      />
      <AuthenticatedRoute
        exact
        component={HomePage}
        path="/:encodedUrlName/admin/settings"
      />
      <AuthenticatedRoute exact component={HomePage} path="/" />
      <Redirect to="/login" />
    </Switch>
  </Router>
);
