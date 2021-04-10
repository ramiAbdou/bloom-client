import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Sidebar from '@components/organisms/Sidebar/Sidebar';
import Analytics from '@scenes/Analytics/Analytics';
import Applicants from '@scenes/Applicants/Applicants';
import Application from '@scenes/Application/Application';
import Database from '@scenes/Database/Database';
import Directory from '@scenes/Directory/Directory';
import Events from '@scenes/Events/Events';
import Integrations from '@scenes/Integrations/Integrations';
import Login from '@scenes/Login/Login';
import Profile from '@scenes/Profile/Profile';
import useUpdateUserId from './hooks/useUpdateUserId';
import useVerifyToken from './hooks/useVerifyToken';
import CatchAllRoute from './routes/CatchAllRoute';
import MemberRoute from './routes/MemberRoute';

const Router: React.FC = () => {
  const loading1: boolean = useUpdateUserId();
  const loading2: boolean = useVerifyToken();

  if (loading1 || loading2) return null;

  return (
    <>
      <Sidebar />

      <Switch>
        <Route exact component={Login} path="/login" />
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

        <MemberRoute exact component={Profile} path="/:urlName/profile" />
        <Redirect path="/:urlName" to="/:urlName/directory" />
        <CatchAllRoute exact path="/" />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default Router;
