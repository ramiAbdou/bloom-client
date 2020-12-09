import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Application from './Application.store';
import ApplicationConfirmation from './components/Confirmation';
import ApplicationForm from './components/Form';

/**
 * Controls sign-up process and has two different routes:
 * - Membership Application Form
 * - Membership Application Form Confirmation
 */
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
