import React from 'react';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import { ICommunity, IMember } from '@util/constants.entities';
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
  community: ICommunity;
  member: IMember;
  members: IMember[];
}

const GET_MEMBERS_BY_USER_ID: DocumentNode = gql`
  query GetMembersByUserId(
    $communityId: String!
    $memberId: String!
    $userId: String!
  ) {
    communityId @client @export(as: "communityId")
    memberId @client @export(as: "memberId")
    userId @client @export(as: "userId")

    community(id: $communityId) {
      ...SidebarCommunityNameFragment
    }

    member(id: $memberId) {
      ...SidebarAdminSectionFragment
      ...SidebarMainSectionFragment
      ...SidebarQuickActionsSectionFragment
      ...SidebarProfileFragment
      ...SidebarProfileSectionFragment
    }

    members(where: { userId: { _eq: $userId } }, order_by: { joinedAt: asc }) {
      id
      community {
        ...SidebarCommunityButtonFragment
      }
    }
  }
  ${SidebarAdminSection.fragment}
  ${SidebarCommunityButton.fragment}
  ${SidebarCommunityName.fragment}
  ${SidebarMainSection.fragment}
  ${SidebarProfile.fragment}
  ${SidebarProfileSection.fragment}
  ${SidebarQuickActionsSection.fragment}
`;

const Sidebar: React.FC = () => {
  const { data, loading } = useQuery<GetMembersByUserIdResult>(
    GET_MEMBERS_BY_USER_ID
  );

  const community: ICommunity = data?.community;
  const member: IMember = data?.member;

  if (loading || !member) return null;

  return (
    <SidebarContainer>
      {data && <SidebarCommunityList {...data} />}

      <div className="f f-col o-scroll w-100">
        {community && <SidebarCommunityName data={community} />}
        <SidebarMainSection data={member} />
        <SidebarAdminSection data={member} />
        <SidebarQuickActionsSection data={member} />
        <SidebarProfileSection data={member} />
        <SidebarProfile data={member} />
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
