import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Application from '@scenes/Application/Application';
import IndividualEvent from '@scenes/Events/IndividualEvent/IndividualEvent';
import { useStoreState } from '@store/Store';
import useFinalPath from '../hooks/useFinalPath';
import AuthenticatedCommunityRouter from './AuthenticatedCommunityRouter';
import useBackupCommunity from './useBackupCommunity';
import useGetTokens from './useGetTokens';
import useInitUser from './useInitUser';

/**
 * Separate the community router into a different Router b/c we need the
 * urlName in the useParams() call in the useInitUser() hook.
 */
const CommunityRouter: React.FC = () => {
  const isAuthenticated = useStoreState(({ db }) => {
    return db.isAuthenticated;
  });

  const finalPath: string = useFinalPath();
  const loading1: boolean = useGetTokens(true);
  const loading2: boolean = useInitUser();
  const loading3: boolean = useBackupCommunity();

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
      <Route component={AuthenticatedCommunityRouter} path="/:urlName" />
      <Redirect to="/:urlName" />
    </Switch>
  );
};

export default CommunityRouter;
