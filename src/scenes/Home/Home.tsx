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

import Navbar from '@components/Navbar/Navbar';
import AdminRoute from '@components/Router/AdminRoute';
import { ChildrenProps, EncodedUrlNameParams } from '@constants';
import { useStoreState } from '@store/Store';
import Admins from './components/Admins/Admins';
import Analytics from './components/Analytics/Analytics';
import Directory from './components/Directory/Directory';
import Events from './components/Events/Events';
import Integrations from './components/Integrations/Integrations';
import MemberDatabase from './components/MemberDatabase/MemberDatabase';
import Membership from './components/Membership/Membership';
import PendingApplications from './components/PendingApplications/PendingApplications';
import Sidebar from './components/Sidebar';

const AuthenticatedCommunityWrapper = ({ children }: ChildrenProps) => {
  const { encodedUrlName } = useParams() as EncodedUrlNameParams;
  const isMemberOfCommunity: boolean = useStoreState(({ membership }) =>
    membership.isMember(encodedUrlName)
  );

  const activeEncodedUrlName = useStoreState(
    ({ membership }) => membership.activeEncodedUrlName
  );

  // If the user isn't a member of the community who's URL we are currently
  // sitting at, then we redirect them to the first community that they are
  // a member of.
  if (!isMemberOfCommunity) return <Redirect to={`/${activeEncodedUrlName}`} />;

  // If they are a member, just return the children.
  return <>{children}</>;
};

const HomeContent = () => {
  const { url } = useRouteMatch();

  return (
    <div className="s-home-content">
      <Switch>
        <Route component={Directory} path={`${url}/directory`} />
        <Route component={Events} path={`${url}/events`} />
        <Route component={Membership} path={`${url}/membership`} />
        <AdminRoute component={MemberDatabase} path={`${url}/database`} />
        <AdminRoute component={Analytics} path={`${url}/analytics`} />
        <AdminRoute component={Integrations} path={`${url}/integrations`} />
        <AdminRoute component={Admins} path={`${url}/admins`} />
        <AdminRoute
          component={PendingApplications}
          path={`${url}/applications`}
        />
        <Redirect to={`${url}/directory`} />
      </Switch>
    </div>
  );
};

export default () => (
  <AuthenticatedCommunityWrapper>
    <div className="s-home">
      <Navbar />

      <div className="s-home-main">
        <Sidebar />
        <HomeContent />
      </div>
    </div>
  </AuthenticatedCommunityWrapper>
);
