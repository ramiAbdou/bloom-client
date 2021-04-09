import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Sidebar from '@organisms/Sidebar/Sidebar';
import Analytics from '@scenes/Analytics/Analytics';
import Applicants from '@scenes/Applicants/Applicants';
import Database from '@scenes/Database/Database';
import Directory from '@scenes/Directory/Directory';
import Events from '@scenes/Events/Events';
import Integrations from '@scenes/Integrations/Integrations';
import Profile from '@scenes/Profile/Profile';
import AdminRoute from './AdminRoute';

const AuthenticatedCommunityRouterSwitch: React.FC = () => (
  <div className="home-content">
    <Switch>
      <Route component={Directory} path="/:urlName/directory" />
      <Route component={Events} path="/:urlName/events" />
      <AdminRoute component={Database} path="/:urlName/database" />
      <AdminRoute component={Analytics} path="/:urlName/analytics" />
      <AdminRoute component={Integrations} path="/:urlName/integrations" />
      <AdminRoute component={Applicants} path="/:urlName/applicants" />
      <Route component={Profile} path="/:urlName/profile" />
      <Redirect to="/:urlName/directory" />
    </Switch>
  </div>
);

const AuthenticatedCommunityRouter: React.FC = () => (
  <>
    <Sidebar />
    <AuthenticatedCommunityRouterSwitch />
  </>
);

export default AuthenticatedCommunityRouter;
