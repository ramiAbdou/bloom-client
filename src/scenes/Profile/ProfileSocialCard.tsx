import React from 'react';

import Button from '@atoms/Button';
import Card from '@containers/Card/Card';
import { useStoreState } from '@store/Store';
import socialMedia from './images/social-media.svg';
import ProfileCardHeader from './ProfileCardHeader';

const ProfileSocialOnboardingContainer: React.FC = () => {
  const isSocialLinked: boolean = useStoreState(({ db }) => {
    const { facebookUrl, instagramUrl, linkedInUrl, twitterUrl } = db.user;
    return !!facebookUrl || !!instagramUrl || !!linkedInUrl || !!twitterUrl;
  });

  if (isSocialLinked) return null;

  return (
    <>
      <img
        alt="Social Media"
        className="s-profile-card--social-empty-img"
        src={socialMedia}
      />

      <Button primary>+ Link Social Media</Button>
    </>
  );
};

const ProfileSocialCard: React.FC = () => {
  const isSocialLinked: boolean = useStoreState(({ db }) => {
    const { facebookUrl, instagramUrl, linkedInUrl, twitterUrl } = db.user;
    return !!facebookUrl || !!instagramUrl || !!linkedInUrl || !!twitterUrl;
  });

  return (
    <Card className="s-profile-card--social">
      <ProfileCardHeader canEdit={isSocialLinked} title="Social Media" />
      <ProfileSocialOnboardingContainer />
    </Card>
  );
};

export default ProfileSocialCard;
