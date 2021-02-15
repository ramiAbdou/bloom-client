import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import Show from '@containers/Show';
import Nav from '@organisms/Nav/Nav';
import Analytics from '@scenes/Analytics/Analytics';
import Applicants from '@scenes/Applicants/Applicants';
import Database from '@scenes/Database/Database';
import Directory from '@scenes/Directory/Directory';
import Events from '@scenes/Events/Events';
import Integrations from '@scenes/Integrations/Integrations';
import Membership from '@scenes/Membership/Membership';
import Profile from '@scenes/Profile/Profile';
import { useStoreState } from '@store/Store';
import AdminRoute from './AdminRoute';
import useBackupCommunity from './useBackupCommunity';
import useInitCommunity from './useInitCommunity';

const AuthenticatedRouter: React.FC = () => {
  const isInitialized = useStoreState(
    ({ db }) => !!db.community && !!db.member && !!db.user
  );

  const autoAccept = useStoreState(({ db }) => db.community?.autoAccept);

  const { url } = useRouteMatch();
  const loading = useInitCommunity();
  useBackupCommunity();

  if (!isInitialized || loading || url === '/') return null;

  return (
    <Show show={isInitialized && !loading && url !== '/'}>
      <Nav />

      <div className="home-content">
        <Switch>
          <Route component={Directory} path="/:urlName/directory" />
          <Route component={Events} path="/:urlName/events" />
          <AdminRoute component={Database} path="/:urlName/database" />
          <AdminRoute component={Analytics} path="/:urlName/analytics" />
          <AdminRoute component={Integrations} path="/:urlName/integrations" />

          {!autoAccept && (
            <AdminRoute component={Applicants} path="/:urlName/applicants" />
          )}

          <Route component={Membership} path="/:urlName/membership" />
          <Route component={Profile} path="/:urlName/profile" />
          <Redirect to="/:urlName/directory" />
        </Switch>
      </div>
    </Show>
  );
};

export default AuthenticatedRouter;
