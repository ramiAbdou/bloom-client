import React from 'react';
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter
} from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import { IUser } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { cx } from '@util/util';
import MemberProfileStore from './Profile.store';

interface MemberProfileSocialButtonProps {
  brand: 'CLUBHOUSE' | 'FACEBOOK' | 'INSTAGRAM' | 'LINKED_IN' | 'TWITTER';
  href: string;
}

const MemberProfileSocialButton: React.FC<MemberProfileSocialButtonProps> = ({
  brand,
  href
}) => {
  if (!href) return null;

  const isClubhouse = brand === 'CLUBHOUSE';
  const isFacebook = brand === 'FACEBOOK';
  const isInstagram = brand === 'INSTAGRAM';
  const isLinkedIn = brand === 'LINKED_IN';
  const isTwitter = brand === 'TWITTER';

  const css = cx('mo-member-profile-social', {
    'mo-member-profile-social--clubhouse': isClubhouse,
    'mo-member-profile-social--facebook': isFacebook,
    'mo-member-profile-social--linkedin': isLinkedIn,
    'mo-member-profile-social--twitter': isTwitter
  });

  return (
    <Button className={css} href={href}>
      {isFacebook && <IoLogoFacebook />}
      {isInstagram && <IoLogoInstagram />}
      {isLinkedIn && <IoLogoLinkedin />}
      {isTwitter && <IoLogoTwitter />}
    </Button>
  );
};

const MemberProfileSocialContainer: React.FC = () => {
  const userId = MemberProfileStore.useStoreState((store) => store.userId);

  const {
    clubhouseUrl,
    facebookUrl,
    instagramUrl,
    linkedInUrl,
    twitterUrl
  }: IUser = useStoreState(({ db }) => db.byUserId[userId]);

  return (
    <div className="flex-ac">
      <MemberProfileSocialButton brand="CLUBHOUSE" href={clubhouseUrl} />
      <MemberProfileSocialButton brand="TWITTER" href={twitterUrl} />
      <MemberProfileSocialButton brand="LINKED_IN" href={linkedInUrl} />
      <MemberProfileSocialButton brand="FACEBOOK" href={facebookUrl} />
      <MemberProfileSocialButton brand="INSTAGRAM" href={instagramUrl} />
    </div>
  );
};

export default MemberProfileSocialContainer;
