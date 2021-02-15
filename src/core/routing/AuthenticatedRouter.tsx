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
  const isAuthenticated = useStoreState(({ db }) => db.isAuthenticated);
  const autoAccept = useStoreState(({ db }) => db.community?.autoAccept);

  const { url } = useRouteMatch();
  const loading = useInitCommunity();
  useBackupCommunity();

  if (!isAuthenticated || loading || url === '/') return null;

  return (
    <Show show={isAuthenticated && !loading && url !== '/'}>
      <Nav />

      <div className="home-content">
        <Switch>
          <Route component={Directory} path={`${url}/directory`} />
          <Route component={Events} path={`${url}/events`} />
          <AdminRoute component={Database} path={`${url}/database`} />
          <AdminRoute component={Analytics} path={`${url}/analytics`} />
          <AdminRoute component={Integrations} path={`${url}/integrations`} />

          {!autoAccept && (
            <AdminRoute component={Applicants} path={`${url}/applicants`} />
          )}

          <Route component={Membership} path={`${url}/membership`} />
          <Route component={Profile} path={`${url}/profile`} />
          <Redirect to={`${url}/directory`} />
        </Switch>
      </div>
    </Show>
  );
};

export default AuthenticatedRouter;
