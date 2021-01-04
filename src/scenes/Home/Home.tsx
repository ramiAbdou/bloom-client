import AdminRoute from 'core/routing/AdminRoute';
import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import AddMemberModal from '@scenes/Home/modals/AddMember/AddMember';
import Analytics from '../Analytics/Analytics';
import Applicants from '../Applicants/Applicants';
import Database from '../Database/Database';
import Directory from '../Directory/Directory';
import Events from '../Events/Events';
import Integrations from '../Integrations/Integrations';
import Membership from '../Membership/Membership';
import BottomBar from './components/BottomBar/BottomBar';
import SidebarPicker from './components/Sidebar/Picker';
import Sidebar from './components/Sidebar/Sidebar';
import AuthWrapper from './hoc/AuthWrapper';
import DuesWrapper from './hoc/DuesWrapper';
import Home from './Home.store';

const HomeContent = () => {
  const { url } = useRouteMatch();

  return (
    <div className="s-home">
      <Switch>
        <Route component={Directory} path={`${url}/directory`} />
        <Route component={Events} path={`${url}/events`} />
        <AdminRoute component={Database} path={`${url}/database`} />
        <AdminRoute component={Analytics} path={`${url}/analytics`} />
        <AdminRoute component={Integrations} path={`${url}/integrations`} />
        <AdminRoute component={Applicants} path={`${url}/applicants`} />
        <Route component={Membership} path={`${url}/membership`} />
        <Redirect to={`${url}/directory`} />
      </Switch>
    </div>
  );
};

export default () => (
  <AuthWrapper>
    <DuesWrapper>
      <div className="s-home-ctr">
        <Home.Provider>
          <BottomBar />
          <Sidebar />
          <HomeContent />
        </Home.Provider>
      </div>

      <SidebarPicker />
      <AddMemberModal />
    </DuesWrapper>
  </AuthWrapper>
);
