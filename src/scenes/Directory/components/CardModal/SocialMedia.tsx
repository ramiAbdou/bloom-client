import React from 'react';
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter
} from 'react-icons/io5';

import DirectoryCard from '../Card/Card.store';

interface SocialMediaButtonProps {
  Icon: React.FC;
  href: string;
}

const SocialMediaButton = ({ Icon, href }: SocialMediaButtonProps) => {
  if (!href) return null;

  return (
    <a
      className="s-directory-modal-social"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <Icon />
    </a>
  );
};

const FacebookButton = () => {
  const facebookUrl = DirectoryCard.useStoreState((store) => store.facebookUrl);
  return <SocialMediaButton Icon={IoLogoFacebook} href={facebookUrl} />;
};

const LinkedInButton = () => {
  const linkedInUrl = DirectoryCard.useStoreState((store) => store.linkedInUrl);
  return <SocialMediaButton Icon={IoLogoLinkedin} href={linkedInUrl} />;
};

const TwitterButton = () => {
  const twitterUrl = DirectoryCard.useStoreState((store) => store.twitterUrl);
  return <SocialMediaButton Icon={IoLogoTwitter} href={twitterUrl} />;
};

const InstagramButton = () => {
  const igUrl = DirectoryCard.useStoreState((store) => store.instagramUrl);
  return <SocialMediaButton Icon={IoLogoInstagram} href={igUrl} />;
};

export default () => (
  <div className="flex-ac">
    <FacebookButton />
    <LinkedInButton />
    <TwitterButton />
    <InstagramButton />
  </div>
);
