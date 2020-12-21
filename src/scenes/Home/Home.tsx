import React from 'react';
import {
  Redirect,
  Route,
  Switch,
  useParams,
  useRouteMatch
} from 'react-router-dom';

import AdminRoute from '@components/Router/AdminRoute';
import { ChildrenProps, EncodedUrlNameParams } from '@constants';
import DuesModal from '@scenes/Actions/Dues/Dues';
import AddMember from '@scenes/Actions/AddMember/AddMember.store';
import AddMemberModal from '@scenes/Actions/AddMember/AddMemberModal';
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
import Home from './Home.store';

const AuthenticatedCommunityWrapper = ({ children }: ChildrenProps) => {
  const { encodedUrlName } = useParams() as EncodedUrlNameParams;

  const activeEncodedUrlName = useStoreState(
    ({ db }) => db.community?.encodedUrlName
  );

  const isMember: boolean = useStoreState(({ db }) => {
    const { communities, members } = db.entities;

    return Object.values(members.byId).some(
      ({ community }) =>
        encodedUrlName === communities.byId[community]?.encodedUrlName
    );
  });

  // If the activeEncodedUrlName hasn't been set yet, that means the community
  // hasn't been loaded in the global state yet, so just wait...
  if (!activeEncodedUrlName) return null;

  // If the user isn't a member of the community who's URL we are currently
  // sitting at, then we redirect them to the first community that they are
  // a member of.
  if (!isMember) return <Redirect to={`/${activeEncodedUrlName}`} />;

  // If they are a member, just return the requested content.
  return <>{children}</>;
};

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
  <AuthenticatedCommunityWrapper>
    <div className="s-home">
      <Home.Provider>
        <BottomBar />
        <Sidebar />
        <HomeContent />
      </Home.Provider>
    </div>

    <SidebarPicker />
    <DuesModal />

    <AddMember.Provider>
      <AddMemberModal />
    </AddMember.Provider>
  </AuthenticatedCommunityWrapper>
);
