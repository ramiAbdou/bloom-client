/**
 * @fileoverview Component: Router
 * - Core routing logic of the entire application. The Modal, Flow and Picker
 * provider go within the Router because we still want the useRouter hook to be
 * within scope when using those components.
 * @author Rami Abdou
 */

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SignupPage from '@scenes/Signup/Signup';

export default () => (
  <Router>
    <Switch>
      <Route exact component={SignupPage} path="/:community" />
    </Switch>
  </Router>
);
