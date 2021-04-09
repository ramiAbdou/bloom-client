import React from 'react';

import MainContent from '@containers/Main/MainContent';
import Scene from '@containers/Scene';
import SidebarHamburgerButton from '@organisms/Sidebar/SidebarHamburgerButton';
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
