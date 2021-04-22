import React from 'react';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import { IMember } from '@core/db/db.entities';
import SidebarAdminSection from './SidebarAdminSection';
import SidebarCommunityButton from './SidebarCommunityButton';
import SidebarCommunityList from './SidebarCommunityList';
import SidebarCommunityName from './SidebarCommunityName';
import SidebarContainer from './SidebarContainer';
import SidebarMainSection from './SidebarMainSection';
import SidebarProfile from './SidebarProfile';
import SidebarProfileSection from './SidebarProfileSection';
import SidebarQuickActionsSection from './SidebarQuickActionsSection';

interface GetMembersByUserIdResult {
  members: IMember[];
}

const GET_MEMBERS_BY_USER_ID: DocumentNode = gql`
  query GetMembersByUserId($userId: String!) {
    userId @client @export(as: "userId")

    members(where: { userId: { _eq: $userId } }, order_by: { joinedAt: asc }) {
      id
      community {
        ...SidebarCommunityButtonFragment
      }
    }
  }
  ${SidebarCommunityButton.fragments.data}
`;

const Sidebar: React.FC = () => {
  const { data, loading } = useQuery<GetMembersByUserIdResult>(
    GET_MEMBERS_BY_USER_ID
  );

  if (loading) return null;

  return (
    <SidebarContainer>
      <SidebarCommunityList {...data} />

      <div className="f f-col o-scroll w-100">
        <SidebarCommunityName />
        <SidebarMainSection />
        <SidebarAdminSection />
        <SidebarQuickActionsSection />
        <SidebarProfileSection />
        <SidebarProfile />
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
