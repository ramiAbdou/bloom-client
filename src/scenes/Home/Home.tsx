/**
 * @fileoverview Scene: Home
 * @author Rami Abdou
 */

import './Home.scss';

import React, { useEffect, useRef, useState } from 'react';
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
import PendingApplications from './components/Applications/Applications';
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
    <Switch>
      <div className="s-home-content">
        <Route component={PendingApplications} path={`${url}/directory`} />
        <Route component={PendingApplications} path={`${url}/events`} />
        <Route component={PendingApplications} path={`${url}/membership`} />
        <AdminRoute
          component={PendingApplications}
          path={`${url}/applications`}
        />
        <Redirect to={`${url}/directory`} />
      </div>
    </Switch>
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
