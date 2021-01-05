import React from 'react';
import { Route, Switch } from 'react-router-dom';

import FullScreenLoader from '@molecules/Loader/FullScreenLoader';
import ApplicationConfirmation from './ApplicationConfirmation';
import ApplicationForm from './ApplicationForm';
import useFetchApplication from './useFetchApplication';

/**
 * Controls sign-up process and has two different routes:
 * - Member Application Form
 * - Member Application Form Confirmation
 */
const Application: React.FC = () => {
  const isFetchingApplication = useFetchApplication();
  if (isFetchingApplication) return <FullScreenLoader />;

  return (
    <div className="s-application-ctr">
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
  );
};

export default Application;
