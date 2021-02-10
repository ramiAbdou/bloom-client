import React from 'react';

import MainContent from '@containers/Main/MainContent';
import ProfileMembershipCard from './ProfileMembershipCard';
import ProfilePersonalCard from './ProfilePersonalCard';
import ProfileSocialCard from './ProfileSocialCard';

const Profile: React.FC = () => (
  <MainContent className="s-profile">
    <div>
      <ProfilePersonalCard />
      <ProfileSocialCard />
      <ProfileMembershipCard />
    </div>

    <ProfileSocialCard />
  </MainContent>
);

export default Profile;
