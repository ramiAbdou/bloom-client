/**
 * @fileoverview Scene: Application
 * - Users will sign up to be a member of an organization here.
 * @author Rami Abdou
 */

import './Application.scss';

import React from 'react';
import { Route } from 'react-router-dom';

import Application from './Application.store';
import ApplicationConfirmation from './components/ApplicationConfirmation';
import ApplicationForm from './components/ApplicationForm';

export default () => (
  <Application.Provider>
    <Route exact component={ApplicationForm} path="/:encodedUrlName/apply" />

    <Route
      exact
      component={ApplicationConfirmation}
      path="/:encodedUrlName/apply/confirmation"
    />
  </Application.Provider>
);
