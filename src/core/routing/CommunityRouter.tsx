import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { updateDocumentColors } from '@db/db.util';
import { GQL } from '@gql/gql.types';
import useGQL from '@gql/useGQL';
import Application from '@scenes/Application/Application';
import IndividualEvent from '@scenes/Events/IndividualEvent/IndividualEvent';
import { useStoreState } from '@store/Store';
import useFinalPath from '../hooks/useFinalPath';
import AuthenticatedCommunityRouter from './AuthenticatedCommunityRouter';
import useBackupCommunity from './useBackupCommunity';
import useGetUserTokens from './useGetUserTokens';
import useInitUser from './useInitUser';

/**
 * Separate the community router into a different Router b/c we need the
 * urlName in the useParams() call in the useInitUser() hook.
 */
const CommunityRouter: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const isAuthenticated: boolean = useStoreState(
    ({ db }) => db.isAuthenticated
  );

  const gql: GQL = useGQL();
  const finalPath: string = useFinalPath();
  const loading1: boolean = useGetUserTokens(true);
  const { loading: loading2 } = useInitUser();
  const loading3: boolean = useBackupCommunity();

  useEffect(() => {
    if (!communityId) return;

    (async () => {
      const { data } = await gql.communities.findOne({
        fields: ['primaryColor'],
        where: { id: communityId }
      });

      console.log(communityId, data);

      updateDocumentColors(data?.primaryColor ?? '#f58023');
    })();
  }, [communityId]);

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
