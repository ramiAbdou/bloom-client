import React from 'react';
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter
} from 'react-icons/io5';

import { cx } from '@util/util';
import DirectoryCard from '../DirectoryCard/DirectoryCard.store';

interface SocialMediaButtonProps {
  brand: 'FACEBOOK' | 'INSTAGRAM' | 'LINKED_IN' | 'TWITTER';
  href: string;
}

const SocialMediaButton: React.FC<SocialMediaButtonProps> = ({
  brand,
  href
}) => {
  if (!href) return null;

  const isFacebook = brand === 'FACEBOOK';
  const isInstagram = brand === 'INSTAGRAM';
  const isLinkedIn = brand === 'LINKED_IN';
  const isTwitter = brand === 'TWITTER';

  const css = cx({
    's-directory-modal-social': true,
    's-directory-modal-social--facebook': isFacebook,
    's-directory-modal-social--linkedin': isLinkedIn,
    's-directory-modal-social--twitter': isTwitter
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

const SocialMediaContainer: React.FC = () => {
  const facebookUrl = DirectoryCard.useStoreState((store) => store.facebookUrl);
  const igUrl = DirectoryCard.useStoreState((store) => store.instagramUrl);
  const linkedInUrl = DirectoryCard.useStoreState((store) => store.linkedInUrl);
  const twitterUrl = DirectoryCard.useStoreState((store) => store.twitterUrl);

  return (
    <div className="flex-ac">
      <SocialMediaButton brand="TWITTER" href={twitterUrl} />
      <SocialMediaButton brand="LINKED_IN" href={linkedInUrl} />
      <SocialMediaButton brand="FACEBOOK" href={facebookUrl} />
      <SocialMediaButton brand="INSTAGRAM" href={igUrl} />
    </div>
  );
};

export default SocialMediaContainer;
