import React from 'react';

import MainContent from '@components/containers/Main/MainContent';
import Scene from '@components/containers/Scene';
import SidebarHamburgerButton from '@components/organisms/Sidebar/SidebarHamburgerButton';
import ProfileMembershipCard from './ProfileMembershipCard';
import ProfilePersonalCard from './ProfilePersonalCard';
import ProfileSocialCard from './ProfileSocialCard';

const ProfileContent: React.FC = () => (
  <div className="s-profile pt-md--d">
    <div>
      <ProfilePersonalCard />
      <ProfileSocialCard />
      <ProfileMembershipCard />
    </div>

    <ProfileSocialCard />
  </div>
);

const Profile: React.FC = () => (
  <Scene>
    <MainContent>
      <SidebarHamburgerButton className="pt-md" />
      <ProfileContent />
    </MainContent>
  </Scene>
);

export default Profile;
