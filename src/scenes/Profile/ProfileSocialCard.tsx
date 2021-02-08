import React from 'react';
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter
} from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import { ModalType } from '@constants';
import Card from '@containers/Card/Card';
import Row from '@containers/Row/Row';
import Show from '@containers/Show';
import { useStoreActions, useStoreState } from '@store/Store';
import { cx } from '@util/util';
import ProfileCardHeader from './ProfileCardHeader';

const ProfileSocialOnboardingContainer: React.FC = () => {
  const isSocialLinked: boolean = useStoreState(({ db }) => {
    const { facebookUrl, instagramUrl, linkedInUrl, twitterUrl } = db.user;
    return !!facebookUrl || !!instagramUrl || !!linkedInUrl || !!twitterUrl;
  });

  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const onClick = () => showModal({ id: ModalType.EDIT_SOCIAL_MEDIA });

  return (
    <Show show={!isSocialLinked}>
      <p className="mb-sm">
        Strengthen your relationships with other community members by adding
        your social profiles!
      </p>

      <Button primary onClick={onClick}>
        + Link Social Media
      </Button>
    </Show>
  );
};

interface ProfileSocialMediaValueProps {
  brand: 'FACEBOOK' | 'INSTAGRAM' | 'LINKED_IN' | 'TWITTER';
  url: string;
}

const ProfileSocialMediaValue: React.FC<ProfileSocialMediaValueProps> = ({
  brand,
  url
}) => {
  if (!url) return null;

  const isFacebook = brand === 'FACEBOOK';
  const isInstagram = brand === 'INSTAGRAM';
  const isLinkedIn = brand === 'LINKED_IN';
  const isTwitter = brand === 'TWITTER';

  const css = cx('s-profile-card--social-logo', {
    's-profile-card--social-logo--facebook': isFacebook,
    's-profile-card--social-logo--linkedin': isLinkedIn,
    's-profile-card--social-logo--twitter': isTwitter
  });

  return (
    <Row className={css}>
      {isFacebook && <IoLogoFacebook />}
      {isInstagram && <IoLogoInstagram />}
      {isLinkedIn && <IoLogoLinkedin />}
      {isTwitter && <IoLogoTwitter />}
      <p>{url}</p>
    </Row>
  );
};

const ProfileSocialCard: React.FC = () => {
  const facebookUrl = useStoreState(({ db }) => db.user.facebookUrl);
  const instagramUrl = useStoreState(({ db }) => db.user.instagramUrl);
  const linkedInUrl = useStoreState(({ db }) => db.user.linkedInUrl);
  const twitterUrl = useStoreState(({ db }) => db.user.twitterUrl);

  const isSocialLinked: boolean =
    !!facebookUrl || !!instagramUrl || !!linkedInUrl || !!twitterUrl;

  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const onClick = () => showModal({ id: ModalType.EDIT_SOCIAL_MEDIA });

  return (
    <Card className="s-profile-card--social">
      <ProfileCardHeader
        canEdit={isSocialLinked}
        title="Social Media"
        onEditClick={onClick}
      />

      <div>
        <ProfileSocialMediaValue brand="TWITTER" url={twitterUrl} />
        <ProfileSocialMediaValue brand="LINKED_IN" url={linkedInUrl} />
        <ProfileSocialMediaValue brand="FACEBOOK" url={facebookUrl} />
        <ProfileSocialMediaValue brand="INSTAGRAM" url={instagramUrl} />
      </div>

      <ProfileSocialOnboardingContainer />
    </Card>
  );
};

export default ProfileSocialCard;
