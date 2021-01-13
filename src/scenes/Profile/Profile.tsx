import React from 'react';

import MainContent from '@containers/Main/MainContent';
import ProfileMembershipCard from './ProfileMembershipCard';
import ProfilePersonalCard from './ProfilePersonalCard';
import ProfilePersonalModal from './ProfilePersonalModal';
import ProfileSocialCard from './ProfileSocialCard';
import ProfileSocialModal from './ProfileSocialModal';

const ProfileContent: React.FC = () => (
  <MainContent className="s-profile" loading={false}>
    <ProfilePersonalCard />
    <ProfileSocialCard />
    <ProfileMembershipCard />
  </MainContent>
);

const ProfileModals: React.FC = () => {
  return (
    <>
      <ProfilePersonalModal />
      <ProfileSocialModal />
    </>
  );
};

const Profile: React.FC = () => {
  return (
    <>
      <ProfileContent />
      <ProfileModals />
    </>
  );
};

export default Profile;
