import React from 'react';

import { IMember } from '@util/db.entities';
import SidebarCommunityButton from './SidebarCommunityButton';

interface SidebarCommunityListProps {
  members: IMember[];
}

const SidebarCommunityList: React.FC<SidebarCommunityListProps> = ({
  members
}) => (
  <div className="f f-ac f-col px-xs py-sm o-nav-community-ctr">
    {members.map((member: IMember) => (
      <SidebarCommunityButton key={member.id} data={member.community} />
    ))}
  </div>
);

export default SidebarCommunityList;
