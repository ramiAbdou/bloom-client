import React from 'react';
import { communityIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import { IMember, MemberStatus } from '@core/db/db.entities';
import useFind from '@core/gql/hooks/useFind';
import { SidebarLinkOptions } from './Sidebar.types';

const SidebarLinkNotificationCircle: React.FC<
  Pick<SidebarLinkOptions, 'to'>
> = ({ to }) => {
  const communityId: string = useReactiveVar(communityIdVar);

  const { data: pendingMembers, loading } = useFind(IMember, {
    where: { communityId, status: MemberStatus.PENDING }
  });

  // As of right now, we are only supporting a notification circle for pending
  // applicants to let admins know that there are applicants to respond to.
  if (to !== 'applicants') return null;

  // If there are no applicants, return null.
  if (loading || !pendingMembers?.length) return null;

  return <div className="br-50 bg-primary h-ss ml-auto mr-xs w-ss" />;
};

export default SidebarLinkNotificationCircle;
