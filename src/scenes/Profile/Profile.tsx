import React from 'react';

import MainContent from '@containers/Main/MainContent';
import ProfilePersonalCard from './ProfilePersonalCard';
import ProfileSocialCard from './ProfileSocialCard';

const ProfileContent: React.FC = () => (
  <MainContent className="s-profile" loading={false}>
    <ProfilePersonalCard />
    <ProfileSocialCard />
    <ProfilePersonalCard />
  </MainContent>
);

const Profile: React.FC = () => {
  return <ProfileContent />;
};

export default Profile;
