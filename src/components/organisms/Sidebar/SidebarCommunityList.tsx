import React from 'react';

import { IMember, MemberStatus } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { sortObjects } from '@util/util';
import SidebarCommunityButton from './SidebarCommunityButton';

const SidebarCommunityList: React.FC = () => {
  const memberIds: string[] = useStoreState(({ db }) => {
    return db.user?.members
      ?.map((memberId: string) => {
        return db.byMemberId[memberId];
      })
      ?.filter((member: IMember) => {
        return member.status === MemberStatus.ACCEPTED;
      })
      ?.sort((a, b) => {
        return sortObjects(a, b, 'joinedAt', 'ASC');
      })
      ?.map((member: IMember) => {
        return member.id;
      });
  });

  return (
    <div className="f f-ac f-col px-xs py-sm o-nav-community-ctr">
      {memberIds?.map((id: string) => {
        return <SidebarCommunityButton key={id} id={id} />;
      })}
    </div>
  );
};

export default SidebarCommunityList;
