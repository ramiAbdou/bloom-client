import React from 'react';

import { IMember, MemberStatus } from '@store/Db/Db.entities';
import { useStoreState } from '@store/Store';
import { sortObjects } from '@util/util';
import SidebarCommunityButton from './SidebarCommunityButton';

const SidebarCommunityList: React.FC = () => {
  const memberIds: string[] = useStoreState(({ db }) =>
    db.user?.members
      ?.map((memberId: string) => db.byMemberId[memberId])
      ?.filter((member: IMember) => member.status === MemberStatus.ACCEPTED)
      ?.sort((a, b) => sortObjects(a, b, 'joinedAt', 'ASC'))
      ?.map((member: IMember) => member.id)
  );

  return (
    <div className="f f-ac f-col px-xs py-sm o-nav-community-ctr">
      {memberIds?.map((id: string) => (
        <SidebarCommunityButton key={id} id={id} />
      ))}
    </div>
  );
};

export default SidebarCommunityList;
