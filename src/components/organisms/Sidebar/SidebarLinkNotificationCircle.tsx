import React from 'react';

import { gql } from '@apollo/client';
import { ComponentWithFragments } from '@util/constants';
import { ICommunity } from '@util/constants.entities';
import { SidebarLinkOptions } from './Sidebar.types';

const SidebarLinkNotificationCircle: ComponentWithFragments<
  ICommunity,
  Pick<SidebarLinkOptions, 'to'>
> = ({ data: community, to }) => {
  // As of right now, we are only supporting a notification circle for pending
  // applicants to let admins know that there are applicants to respond to.
  if (to !== 'applicants') return null;

  // If there are no applicants, return null.
  if (!community?.members?.length) return null;

  return <div className="br-50 bg-primary h-ss ml-auto mr-xs w-ss" />;
};

SidebarLinkNotificationCircle.fragment = gql`
  fragment SidebarLinkNotificationCircleFragment on communities {
    members(where: { status: { _eq: "Pending" } }) {
      id
    }
  }
`;

export default SidebarLinkNotificationCircle;
