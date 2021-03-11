import React from 'react';

import MainContent from '@containers/Main/MainContent';
import SidebarHamburgerButton from '@organisms/Sidebar/SidebarHamburgerButton';
import ProfileMembershipCard from './ProfileMembershipCard';
import ProfilePersonalCard from './ProfilePersonalCard';
import ProfileSocialCard from './ProfileSocialCard';

const ProfileContent: React.FC = () => {
  return (
    <div className="s-profile pt-md--d">
      <div>
        <ProfilePersonalCard />
        <ProfileSocialCard />
        <ProfileMembershipCard />
      </div>

      <ProfileSocialCard />
    </div>
  );
};

const Profile: React.FC = () => {
  return (
    <MainContent>
      <SidebarHamburgerButton className="pt-md" />
      <ProfileContent />
    </MainContent>
  );
};

export default Profile;
