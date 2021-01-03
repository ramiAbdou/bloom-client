import deepequal from 'fast-deep-equal';
import React from 'react';
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter
} from 'react-icons/io5';

import MemberCard from '../Card/Card.store';

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

export default () => {
  const {
    facebookUrl,
    linkedInUrl,
    twitterUrl,
    instagramUrl
  } = MemberCard.useStoreState((store) => store.member, deepequal);

  return (
    <div className="s-directory-modal-social-ctr">
      <SocialMediaButton Icon={IoLogoFacebook} href={facebookUrl} />
      <SocialMediaButton Icon={IoLogoLinkedin} href={linkedInUrl} />
      <SocialMediaButton Icon={IoLogoTwitter} href={twitterUrl} />
      <SocialMediaButton Icon={IoLogoInstagram} href={instagramUrl} />
    </div>
  );
};
