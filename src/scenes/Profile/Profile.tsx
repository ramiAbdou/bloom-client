import React from 'react';

import MainContent from '@containers/Main/MainContent';
import ProfileMembershipCard from './ProfileMembershipCard';
import ProfileMembershipModal from './ProfileMembershipModal';
import ProfilePersonalCard from './ProfilePersonalCard';
import ProfilePersonalModal from './ProfilePersonalModal';
import ProfileSocialCard from './ProfileSocialCard';
import ProfileSocialModal from './ProfileSocialModal';

const ProfileContent: React.FC = () => (
  <MainContent className="s-profile">
    <div>
      <ProfilePersonalCard />
      <ProfileSocialCard />
      <ProfileMembershipCard />
    </div>

    <ProfileSocialCard />
  </MainContent>
);

const ProfileModals: React.FC = () => {
  return (
    <>
      <ProfileMembershipModal />
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
