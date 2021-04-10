import React from 'react';

import { IMember, MemberStatus } from '@core/db/db.entities';
import { useStoreState } from '@core/store/Store';
import useFind from '@gql/hooks/useFind';
import { SidebarLinkOptions } from './Sidebar.types';

const SidebarLinkNotificationCircle: React.FC<
  Pick<SidebarLinkOptions, 'to'>
> = ({ to }) => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const pendingMembers: IMember[] = useFind(IMember, {
    where: { communityId, status: MemberStatus.PENDING }
  });

  // As of right now, we are only supporting a notification circle for pending
  // applicants to let admins know that there are applicants to respond to.
  if (to !== 'applicants') return null;

  // If there are no applicants, return null.
  if (!pendingMembers?.length) return null;

  return <div className="br-50 bg-primary h-ss ml-auto mr-xs w-ss" />;
};

export default SidebarLinkNotificationCircle;
