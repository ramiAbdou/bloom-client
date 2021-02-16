import React from 'react';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';

import { UrlNameProps } from '@constants';
import Application from '@scenes/Application/Application';
import IndividualEvent from '@scenes/Events/IndividualEvent/IndividualEvent';
import { useStoreState } from '@store/Store';
import useFinalPath from '../hooks/useFinalPath';
import AuthenticatedRouter from './AuthenticatedRouter';
import useGetTokens from './useGetTokens';
import useInitUser from './useInitUser';

/**
 * Separate the community router into a different Router b/c we need the
 * urlName in the useParams() call in the useInitUser() hook.
 */
const CommunityRouter: React.FC = () => {
  const isAuthenticated = useStoreState(({ db }) => db.isAuthenticated);

  const { urlName }: UrlNameProps = useParams();
  const finalPath = useFinalPath();

  const loading1 = useGetTokens(urlName ?? null);
  const loading2 = useInitUser();

  if (loading1 || loading2) return null;

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
      <Route exact component={AuthenticatedRouter} path="/" />
      <Redirect to="/:urlName" />
    </Switch>
  );
};

export default CommunityRouter;
