import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

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
import useInitCommunity from './useInitCommunity';

const AuthenticatedCommunityRouterSwitch: React.FC = () => {
  const autoAccept = useStoreState(({ db }) => db.community?.autoAccept);

  return (
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
  );
};

const AuthenticatedCommunityRouter: React.FC = () => {
  const isAuthenticated = useStoreState(({ db }) => db.isAuthenticated);
  const isInitialized = useStoreState(({ db }) => db.isInitialized);
  const loading = useInitCommunity();

  if (!isAuthenticated) return <Redirect to="/login" />;
  if (!isInitialized || loading) return null;

  return (
    <>
      <Nav />
      <AuthenticatedCommunityRouterSwitch />
    </>
  );
};

export default AuthenticatedCommunityRouter;
