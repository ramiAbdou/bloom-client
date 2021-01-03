import deepequal from 'fast-deep-equal';
import React from 'react';
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter
} from 'react-icons/io5';

import MemberCard from '../Card/Card.store';

export default () => {
  const {
    facebookUrl,
    linkedInUrl,
    twitterUrl,
    instagramUrl
  } = MemberCard.useStoreState((store) => store.member, deepequal);

  return (
    <div className="s-directory-modal-social-ctr">
      {facebookUrl && (
        <a
          className="s-directory-modal-social s-directory-modal-social--facebook"
          href={facebookUrl}
          rel="noreferrer"
          target="_blank"
        >
          <IoLogoFacebook />
        </a>
      )}

      {linkedInUrl && (
        <a
          className="s-directory-modal-social s-directory-modal-social--linkedin"
          href={linkedInUrl}
          rel="noreferrer"
          target="_blank"
        >
          <IoLogoLinkedin />
        </a>
      )}

      {twitterUrl && (
        <a
          className="s-directory-modal-social s-directory-modal-social--twitter"
          href={twitterUrl}
          rel="noreferrer"
          target="_blank"
        >
          <IoLogoTwitter />
        </a>
      )}

      {instagramUrl && (
        <a
          className="s-directory-modal-social"
          href={instagramUrl}
          rel="noreferrer"
          target="_blank"
        >
          <IoLogoInstagram />
        </a>
      )}
    </div>
  );
};
