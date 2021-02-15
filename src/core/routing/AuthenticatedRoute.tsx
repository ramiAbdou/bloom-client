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
import useInitUser from './useInitUser';

const HomeRouteContent: React.FC = () => {
  const isInitialized: boolean = useStoreState(({ db }) => {
    return !!db.community && !!db.member && !!db.user;
  });

  const autoAccept = useStoreState(({ db }) => db.community?.autoAccept);

  const { url } = useRouteMatch();
  const loading = useInitCommunity();
  useBackupCommunity();

  return (
    <Show show={isInitialized && !loading && url !== '/'}>
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

const HomeRoute: React.FC = () => {
  const isAuthenticated = useStoreState(({ db }) => !!db.user);
  const loading = useInitUser();

  // If they are a member, just return the requested content.
  return (
    <Show show={!loading && isAuthenticated}>
      <HomeRouteContent />
    </Show>
  );
};

export default HomeRoute;
