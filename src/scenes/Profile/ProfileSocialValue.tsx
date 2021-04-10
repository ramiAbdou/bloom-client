import React from 'react';
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter
} from 'react-icons/io5';

import Row from '@components/containers/Row/Row';
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

  const isFacebook: boolean = brand === SocialBrand.FACEBOOK;
  const isInstagram: boolean = brand === SocialBrand.INSTAGRAM;
  const isLinkedIn: boolean = brand === SocialBrand.LINKED_IN;
  const isTwitter: boolean = brand === SocialBrand.TWITTER;

  const css: string = cx('s-profile-card--social-logo', {
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
