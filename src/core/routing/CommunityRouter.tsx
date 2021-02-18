import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Application from '@scenes/Application/Application';
import IndividualEvent from '@scenes/Events/IndividualEvent/IndividualEvent';
import { useStoreState } from '@store/Store';
import useFinalPath from '../hooks/useFinalPath';
import AuthenticatedRouter from './AuthenticatedRouter';
import useBackupCommunity from './useBackupCommunity';
import useGetTokens from './useGetTokens';
import useInitUser from './useInitUser';

/**
 * Separate the community router into a different Router b/c we need the
 * urlName in the useParams() call in the useInitUser() hook.
 */
const CommunityRouter: React.FC = () => {
  const isAuthenticated = useStoreState(({ db }) => db.isAuthenticated);

  const finalPath = useFinalPath();

  const loading1 = useGetTokens();
  const loading2 = useInitUser();
  const loading3 = useBackupCommunity();

  if (loading1 || loading2 || loading3) return null;

  return (
    <Switch>
      {!isAuthenticated && !['past', 'upcoming'].includes(finalPath) && (
        <Route
          exact
          component={IndividualEvent}
          path="/:urlName/events/:eventId"
        />
      )}

      <Route exact component={Application} path="/:urlName/apply" />
      <Route component={AuthenticatedRouter} path="/:urlName" />
      <Redirect to="/:urlName" />
    </Switch>
  );
};

export default CommunityRouter;
