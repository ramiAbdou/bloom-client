import React from 'react';
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter
} from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import { IMember, IMemberSocials } from '@store/Db/entities';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
import { SocialBrand } from '@util/constants';
import { cx } from '@util/util';

interface ProfileSocialButtonProps {
  brand: SocialBrand;
  href: string;
}

const ProfileSocialButton: React.FC<ProfileSocialButtonProps> = ({
  brand,
  href
}) => {
  const isClubhouse = brand === SocialBrand.CLUBHOUSE;
  const isFacebook = brand === SocialBrand.FACEBOOK;
  const isInstagram = brand === SocialBrand.INSTAGRAM;
  const isLinkedIn = brand === SocialBrand.LINKED_IN;
  const isTwitter = brand === SocialBrand.TWITTER;

  const css = cx('mo-profile-social mr-sm', {
    'mo-profile-social--clubhouse': isClubhouse,
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

const ProfileSocialContainer: React.FC = () => {
  const memberId = IdStore.useStoreState((state) => state.id);

  const {
    clubhouseUrl,
    facebookUrl,
    instagramUrl,
    linkedInUrl,
    twitterUrl
  }: IMemberSocials = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];
    return db.bySocialsId[member?.socials];
  });

  return (
    <div className="flex-ac">
      <ProfileSocialButton brand={SocialBrand.CLUBHOUSE} href={clubhouseUrl} />
      <ProfileSocialButton brand={SocialBrand.TWITTER} href={twitterUrl} />
      <ProfileSocialButton brand={SocialBrand.LINKED_IN} href={linkedInUrl} />
      <ProfileSocialButton brand={SocialBrand.FACEBOOK} href={facebookUrl} />
      <ProfileSocialButton brand={SocialBrand.INSTAGRAM} href={instagramUrl} />
    </div>
  );
};

export default ProfileSocialContainer;
