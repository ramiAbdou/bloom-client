import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import AdminRoute from '@components/Router/AdminRoute';
import AddMemberModal from '@scenes/Actions/AddMember/AddMember';
import { useStoreState } from '@store/Store';
import Analytics from '../Analytics/Analytics';
import Applicants from '../Applicants/Applicants';
import Database from '../Database/Database';
import Directory from '../Directory/Directory';
import Events from '../Events/Events';
import Integrations from '../Integrations/Integrations';
import BottomBar from './components/BottomBar/BottomBar';
import SidebarPicker from './components/Sidebar/Picker';
import Sidebar from './components/Sidebar/Sidebar';
import AuthWrapper from './containers/AuthWrapper';
import DuesWrapper from './containers/DuesWrapper';
import Home from './Home.store';

const HomeContent = () => {
  const { url } = useRouteMatch();
  const autoAccept = useStoreState(({ db }) => db.community.autoAccept);

  return (
    <div className="s-home-content-ctr">
      <Switch>
        <Route component={Directory} path={`${url}/directory`} />
        <Route component={Events} path={`${url}/events`} />
        <AdminRoute component={Database} path={`${url}/database`} />
        <AdminRoute component={Analytics} path={`${url}/analytics`} />
        <AdminRoute component={Integrations} path={`${url}/integrations`} />
        {!autoAccept && (
          <AdminRoute component={Applicants} path={`${url}/applicants`} />
        )}
        <Redirect to={`${url}/directory`} />
      </Switch>
    </div>
  );
};

export default () => (
  <AuthWrapper>
    <DuesWrapper>
      <div className="s-home">
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
