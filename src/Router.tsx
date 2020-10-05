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
  Switch
} from 'react-router-dom';

import { Loader } from '@components/Loader';
import HomePage from '@scenes/Home/Home';
import LoginPage from '@scenes/Login/Login';
import SignupPage from '@scenes/Signup/Signup';
import { useStoreActions } from '@store/Store';
import { GET_USER } from '@store/UserGQL';

const AuthenticatedRoute = ({ component, ...rest }) => {
  const { loading, data } = useQuery(GET_USER);
  const initUser = useStoreActions((store) => store.user.init);

  useEffect(() => {
    if (!data?.getUser) return;
    initUser(data.getUser);
  }, [data?.getUser?.id]);

  if (loading) return <Loader />;
  if (data?.getUser) return <Route {...rest} component={component} />;
  return <Redirect to="/login" />;
};

export default () => (
  <Router>
    <Switch>
      <AuthenticatedRoute exact component={HomePage} path="/" />
      <Route exact component={LoginPage} path="/login" />
      <Route exact component={SignupPage} path="/:community" />
    </Switch>
  </Router>
);
