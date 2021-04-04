import React from 'react';

import { IMember, MemberStatus } from '@db/db.entities';
import { useStoreState } from '@store/Store';
import { SidebarLinkOptions } from './Sidebar.types';
import useInitSidebarLinkNotificationCircle from './useInitSidebarLinkNotificationCircle';

const SidebarLinkNotificationCircle: React.FC<
  Pick<SidebarLinkOptions, 'to'>
> = ({ to }) => {
  const hasApplicants: boolean = useStoreState(({ db }) =>
    db.community.members
      ?.map((memberId: string) => db.byMemberId[memberId])
      ?.some((member: IMember) => member?.status === MemberStatus.PENDING)
  );

  useInitSidebarLinkNotificationCircle(to);

  // As of right now, we are only supporting a notification circle for pending
  // applicants to let admins know that there are applicants to respond to.
  if (to !== 'applicants') return null;

  // If there are no applicants, return null.
  if (!hasApplicants) return null;

  return <div className="br-50 bg-primary h-ss ml-auto mr-xs w-ss" />;
};

export default SidebarLinkNotificationCircle;
