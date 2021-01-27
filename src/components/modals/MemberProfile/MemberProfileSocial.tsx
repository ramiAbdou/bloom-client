import React from 'react';
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter
} from 'react-icons/io5';

import { IUser } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { cx } from '@util/util';
import MemberProfileStore from './MemberProfile.store';

interface MemberProfileSocialButtonProps {
  brand: 'FACEBOOK' | 'INSTAGRAM' | 'LINKED_IN' | 'TWITTER';
  href: string;
}

const MemberProfileSocialButton: React.FC<MemberProfileSocialButtonProps> = ({
  brand,
  href
}) => {
  if (!href) return null;

  const isFacebook = brand === 'FACEBOOK';
  const isInstagram = brand === 'INSTAGRAM';
  const isLinkedIn = brand === 'LINKED_IN';
  const isTwitter = brand === 'TWITTER';

  const css = cx('mo-member-profile-social', {
    'mo-member-profile-social--facebook': isFacebook,
    'mo-member-profile-social--linkedin': isLinkedIn,
    'mo-member-profile-social--twitter': isTwitter
  });

  return (
    <a className={css} href={href} rel="noreferrer" target="_blank">
      {isFacebook && <IoLogoFacebook />}
      {isInstagram && <IoLogoInstagram />}
      {isLinkedIn && <IoLogoLinkedin />}
      {isTwitter && <IoLogoTwitter />}
    </a>
  );
};

const MemberProfileSocialContainer: React.FC = () => {
  const userId = MemberProfileStore.useStoreState((store) => store.userId);

  const {
    facebookUrl,
    instagramUrl,
    linkedInUrl,
    twitterUrl
  }: IUser = useStoreState(({ db }) => {
    const { byId: byUserId } = db.entities.users;
    return byUserId[userId];
  });

  return (
    <div className="flex-ac">
      <MemberProfileSocialButton brand="TWITTER" href={twitterUrl} />
      <MemberProfileSocialButton brand="LINKED_IN" href={linkedInUrl} />
      <MemberProfileSocialButton brand="FACEBOOK" href={facebookUrl} />
      <MemberProfileSocialButton brand="INSTAGRAM" href={instagramUrl} />
    </div>
  );
};

export default MemberProfileSocialContainer;
