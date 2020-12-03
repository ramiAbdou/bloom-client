/**
 * @fileoverview Scene: Application
 * - Users will sign up to be a member of an organization here.

 */

import './Application.scss';

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Application from './Application.store';
import ApplicationConfirmation from './components/ApplicationConfirmation';
import ApplicationForm from './components/ApplicationForm';

export default () => (
  <Application.Provider>
    <Switch>
      <Route exact component={ApplicationForm} path="/:encodedUrlName/apply" />

      <Route
        exact
        component={ApplicationConfirmation}
        path="/:encodedUrlName/apply/confirmation"
      />
    </Switch>
  </Application.Provider>
);
