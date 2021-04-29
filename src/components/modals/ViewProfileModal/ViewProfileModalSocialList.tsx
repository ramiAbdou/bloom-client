import React from 'react';
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter
} from 'react-icons/io5';

import { gql } from '@apollo/client';
import Button from '@components/atoms/Button/Button';
import { ComponentWithFragments, SocialBrand } from '@util/constants';
import { IMember, IMemberSocials } from '@util/constants.entities';
import { cx } from '@util/util';

interface ProfileModalSocialButtonProps {
  brand: SocialBrand;
  href: string;
}

const ProfileModalSocialButton: React.FC<ProfileModalSocialButtonProps> = ({
  brand,
  href
}) => {
  const isFacebook: boolean = brand === SocialBrand.FACEBOOK;
  const isInstagram: boolean = brand === SocialBrand.INSTAGRAM;
  const isLinkedIn: boolean = brand === SocialBrand.LINKED_IN;
  const isTwitter: boolean = brand === SocialBrand.TWITTER;

  const css: string = cx('mo-profile-social mr-sm--nlc', {
    'mo-profile-social--facebook': isFacebook,
    'mo-profile-social--linkedin': isLinkedIn,
    'mo-profile-social--twitter': isTwitter
  });

  return (
    <Button className={css} href={href} show={!!href}>
      {isFacebook && <IoLogoFacebook />}
      {isInstagram && <IoLogoInstagram />}
      {isLinkedIn && <IoLogoLinkedin />}
      {isTwitter && <IoLogoTwitter />}
    </Button>
  );
};

const ProfileModalSocialList: ComponentWithFragments<IMember> = ({
  data: member
}) => {
  const {
    facebookUrl,
    instagramUrl,
    linkedInUrl,
    twitterUrl
  }: IMemberSocials = member.memberSocials;

  return (
    <div className="f f-ac">
      <ProfileModalSocialButton brand={SocialBrand.TWITTER} href={twitterUrl} />

      <ProfileModalSocialButton
        brand={SocialBrand.LINKED_IN}
        href={linkedInUrl}
      />

      <ProfileModalSocialButton
        brand={SocialBrand.FACEBOOK}
        href={facebookUrl}
      />

      <ProfileModalSocialButton
        brand={SocialBrand.INSTAGRAM}
        href={instagramUrl}
      />
    </div>
  );
};

ProfileModalSocialList.fragment = gql`
  fragment ProfileModalSocialListFragment on members {
    memberSocials {
      facebookUrl
      instagramUrl
      linkedInUrl
      twitterUrl
    }
  }
`;

export default ProfileModalSocialList;
