/**
 * @fileoverview Scene: Home
 * @author Rami Abdou
 */

import './Home.scss';

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
import Navbar from '@scenes/Home/components/Navbar/Navbar';
import { useStoreState } from '@store/Store';
import Analytics from './components/Analytics/Analytics';
import Directory from './components/Directory/Directory';
import Events from './components/Events/Events';
import Integrations from './components/Integrations/Integrations';
import MemberDatabase from './components/MemberDatabase/MemberDatabase';
import PendingApplicants from './components/PendingApplicants/PendingApplicants';
import Sidebar from './components/Sidebar/Sidebar';

const AuthenticatedCommunityWrapper = ({ children }: ChildrenProps) => {
  const { encodedUrlName } = useParams() as EncodedUrlNameParams;
  const activeEncodedUrlName = useStoreState(
    ({ community }) => community?.encodedUrlName
  );

  const isMember: boolean = useStoreState(({ communities, memberships }) =>
    Object.values(memberships.byId).some(
      ({ community }) =>
        encodedUrlName === communities.byId[community]?.encodedUrlName
    )
  );

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

  return (
    <div className="s-home-content">
      <Switch>
        <Route component={Directory} path={`${url}/directory`} />
        <Route component={Events} path={`${url}/events`} />
        <AdminRoute component={MemberDatabase} path={`${url}/database`} />
        <AdminRoute component={Analytics} path={`${url}/analytics`} />
        <AdminRoute component={Integrations} path={`${url}/integrations`} />
        <AdminRoute component={PendingApplicants} path={`${url}/applicants`} />
        <Redirect to={`${url}/directory`} />
      </Switch>
    </div>
  );
};

export default () => (
  <AuthenticatedCommunityWrapper>
    <div className="s-home">
      <div className="s-home-nav">
        <Navbar />
        <Sidebar />
      </div>

      <HomeContent />
    </div>
  </AuthenticatedCommunityWrapper>
);
