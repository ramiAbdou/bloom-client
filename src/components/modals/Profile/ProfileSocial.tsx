import React from 'react';
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter
} from 'react-icons/io5';

import Button from '@components/atoms/Button/Button';
import Show from '@components/containers/Show';
import IdStore from '@core/store/Id.store';
import { IMemberSocials } from '@core/db/db.entities';
import useFindOne from '@gql/hooks/useFindOne';
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

const ProfileSocialContainer: React.FC = () => {
  const memberId: string = IdStore.useStoreState((state) => state.id);

  const { data, loading } = useFindOne(IMemberSocials, {
    fields: ['facebookUrl', 'instagramUrl', 'linkedInUrl', 'twitterUrl'],
    where: { memberId }
  });

  const {
    facebookUrl,
    instagramUrl,
    linkedInUrl,
    twitterUrl
  }: IMemberSocials = data;

  return (
    <Show show={!loading}>
      <div className="f f-ac">
        <ProfileSocialButton brand={SocialBrand.TWITTER} href={twitterUrl} />
        <ProfileSocialButton brand={SocialBrand.LINKED_IN} href={linkedInUrl} />
        <ProfileSocialButton brand={SocialBrand.FACEBOOK} href={facebookUrl} />
        <ProfileSocialButton
          brand={SocialBrand.INSTAGRAM}
          href={instagramUrl}
        />
      </div>
    </Show>
  );
};

export default ProfileSocialContainer;
