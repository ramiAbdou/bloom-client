import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// import Sidebar from '@organisms/Sidebar/Sidebar';
import Analytics from '@scenes/Analytics/Analytics';
import Applicants from '@scenes/Applicants/Applicants';
import Application from '@scenes/Application/Application';
import Database from '@scenes/Database/Database';
import Directory from '@scenes/Directory/Directory';
import Events from '@scenes/Events/Events';
import Integrations from '@scenes/Integrations/Integrations';
import Profile from '@scenes/Profile/Profile';
// import Scene from '../components/containers/Scene';
// import CommunityRouter from './CommunityRouter';
import LoginRoute from './LoginRoute';
import MemberRoute from './MemberRoute';
import useUpdateUserId from './useUpdateUserId';
import useVerifyToken from './useVerifyToken';

/**
 * Core routing logic of the entire application. Nested logic should live
 * within each of the high level components. The Home route should have the
 * most nested logic within it.
 */
const Router: React.FC = () => {
  const loading1: boolean = useUpdateUserId();
  const loading2: boolean = useVerifyToken();

  if (loading1 || loading2) return null;

  return (
    <Switch>
      <LoginRoute exact path="/login" />
      <Route exact component={Application} path="/:urlName/apply" />
      <MemberRoute admin component={Analytics} path="/:urlName/analytics" />

      <MemberRoute
        admin
        exact
        component={Applicants}
        path="/:urlName/applicants"
      />

      <MemberRoute admin component={Database} path="/:urlName/database" />
      <MemberRoute exact component={Directory} path="/:urlName/directory" />
      <Route component={Events} path="/:urlName/events" />

      <MemberRoute
        admin
        component={Integrations}
        path="/:urlName/integrations"
      />

      <Route component={Profile} path="/:urlName/profile" />

      {/* <Redirect to="/:urlName/directory" /> */}
      {/* <Route component={CommunityRouter} path="/:urlName" />
      <Route exact component={CommunityRouter} path="/" /> */}
      <Redirect to="/login" />
    </Switch>
  );
};

export default Router;
