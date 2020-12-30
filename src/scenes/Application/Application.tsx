import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Application from './Application.store';
import ApplicationConfirmation from './frames/Confirmation/Confirmation';
import ApplicationForm from './frames/Form/Form';

/**
 * Controls sign-up process and has two different routes:
 * - Member Application Form
 * - Member Application Form Confirmation
 */
export default () => (
  <Application.Provider>
    <div className="s-signup-ctr">
      <Switch>
        <Route
          exact
          component={ApplicationForm}
          path="/:encodedUrlName/apply"
        />

        <Route
          exact
          component={ApplicationConfirmation}
          path="/:encodedUrlName/apply/confirmation"
        />
      </Switch>
    </div>
  </Application.Provider>
);
