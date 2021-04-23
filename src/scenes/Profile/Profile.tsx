import React from 'react';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import MainContent from '@components/containers/Main/MainContent';
import Scene from '@components/containers/Scene';
import SidebarHamburgerButton from '@components/organisms/Sidebar/SidebarHamburgerButton';
import { IMember } from '@util/constants.entities';
import ProfileMembershipCard from './ProfileMembershipCard';
import ProfilePersonalCard from './ProfilePersonalCard';
import ProfileSocialCard from './ProfileSocialCard';

interface GetMemberProfileByMemberIdResult {
  member: IMember;
}

const GET_MEMBER_PROFILE_BY_MEMBER_ID: DocumentNode = gql`
  query GetMemberProfileByMemberId($memberId: String!) {
    memberId @client @export(as: "memberId")

    member(id: $memberId) {
      id
    }
  }
`;

const Profile: React.FC = () => {
  const { data, loading } = useQuery<GetMemberProfileByMemberIdResult>(
    GET_MEMBER_PROFILE_BY_MEMBER_ID
  );

  if (loading) return null;

  const member: IMember = data?.member;

  return (
    <Scene>
      <MainContent>
        <SidebarHamburgerButton className="pt-md" />

        <div className="s-profile pt-md--d">
          <div>
            <ProfilePersonalCard />
            <ProfileSocialCard />
            {member && <ProfileMembershipCard data={member} />}
          </div>

          <ProfileSocialCard />
        </div>
      </MainContent>
    </Scene>
  );
};

export default Profile;
