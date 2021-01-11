import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Loader from '@molecules/Loader/Loader';
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
  if (isFetchingApplication) return <Loader />;

  return (
    <Switch>
      <Route exact component={ApplicationForm} path="/:urlName/apply" />

      <Route
        exact
        component={ApplicationConfirmation}
        path="/:urlName/apply/confirmation"
      />
    </Switch>
  );
};

export default Application;
