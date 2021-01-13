import React from 'react';

import Button from '@atoms/Button';
import { ModalType } from '@constants';
import Card from '@containers/Card/Card';
import { useStoreActions, useStoreState } from '@store/Store';
import socialMedia from './images/social-media.svg';
import ProfileCardHeader from './ProfileCardHeader';

const ProfileSocialOnboardingContainer: React.FC = () => {
  const isSocialLinked: boolean = useStoreState(({ db }) => {
    const { facebookUrl, instagramUrl, linkedInUrl, twitterUrl } = db.user;
    return !!facebookUrl || !!instagramUrl || !!linkedInUrl || !!twitterUrl;
  });

  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const onClick = () => showModal(ModalType.EDIT_SOCIAL_MEDIA);

  if (isSocialLinked) return null;

  return (
    <>
      <img
        alt="Social Media"
        className="s-profile-card--social-empty-img"
        src={socialMedia}
      />

      <Button primary onClick={onClick}>
        + Link Social Media
      </Button>
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
