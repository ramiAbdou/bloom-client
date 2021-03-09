import React from 'react';
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter
} from 'react-icons/io5';

import Row from '@containers/Row/Row';
import { SocialBrand } from '@util/constants';
import { cx } from '@util/util';

interface ProfileSocialMediaValueProps {
  brand: SocialBrand;
  url: string;
}

const ProfileSocialValue: React.FC<ProfileSocialMediaValueProps> = ({
  brand,
  url
}) => {
  if (!url) return null;

  const isClubhouse = brand === SocialBrand.CLUBHOUSE;
  const isFacebook = brand === SocialBrand.FACEBOOK;
  const isInstagram = brand === SocialBrand.INSTAGRAM;
  const isLinkedIn = brand === SocialBrand.LINKED_IN;
  const isTwitter = brand === SocialBrand.TWITTER;

  const css = cx('s-profile-card--social-logo', {
    's-profile-card--social-logo--clubhouse': isClubhouse,
    's-profile-card--social-logo--facebook': isFacebook,
    's-profile-card--social-logo--linkedin': isLinkedIn,
    's-profile-card--social-logo--twitter': isTwitter
  });

  return (
    <Row className={css} spacing="xs">
      {isLinkedIn && <IoLogoLinkedin />}
      {isTwitter && <IoLogoTwitter />}
      {isFacebook && <IoLogoFacebook />}
      {isInstagram && <IoLogoInstagram />}
      <p>{url}</p>
    </Row>
  );
};

export default ProfileSocialValue;
