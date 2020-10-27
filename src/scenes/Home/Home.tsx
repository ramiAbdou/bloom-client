/**
 * @fileoverview Scene: Home
 * @author Rami Abdou
 */

import './Home.scss';

import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

import Navbar from '@components/Navbar/Navbar';
import { ChildrenProps, EncodedUrlNameParams } from '@constants';
import { useStoreState } from '@store/Store';
import Sidebar from './components/Sidebar';

const AuthenticatedCommunityWrapper = ({ children }: ChildrenProps) => {
  const { encodedUrlName } = useParams() as EncodedUrlNameParams;
  const isMemberOfCommunity: boolean = useStoreState(({ membership }) =>
    membership.isMember(encodedUrlName)
  );

  const newEncodedUrlName = useStoreState(
    ({ membership }) => membership?.activeMembership?.community?.encodedUrlName
  );

  // If the user isn't a member of the community who's URL we are currently
  // sitting at, then we redirect them to the first community that they are
  // a member of.
  if (!isMemberOfCommunity) return <Redirect to={`/${newEncodedUrlName}`} />;

  // If they are a member, just return the children.
  return <>{children}</>;
};

export default () => (
  <AuthenticatedCommunityWrapper>
    <div className="s-home">
      <Navbar />
      <Sidebar />
    </div>
  </AuthenticatedCommunityWrapper>
);
