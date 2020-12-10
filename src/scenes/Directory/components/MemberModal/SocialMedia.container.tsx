import deepequal from 'fast-deep-equal';
import React from 'react';
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter
} from 'react-icons/io5';

import Button from '@components/Button/Button';
import MemberCard from '../MemberCard/MemberCard.store';

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
        <Button
          className="s-directory-modal-social s-directory-modal-social--facebook"
          href={facebookUrl}
          target="_blank"
        >
          <IoLogoFacebook />
        </Button>
      )}

      {linkedInUrl && (
        <Button
          className="s-directory-modal-social s-directory-modal-social--linkedin"
          href={linkedInUrl}
          target="_blank"
        >
          <IoLogoLinkedin />
        </Button>
      )}

      {twitterUrl && (
        <Button
          className="s-directory-modal-social s-directory-modal-social--twitter"
          href={twitterUrl}
          target="_blank"
        >
          <IoLogoTwitter />
        </Button>
      )}

      {instagramUrl && (
        <Button
          className="s-directory-modal-social"
          href={instagramUrl}
          target="_blank"
        >
          <IoLogoInstagram />
        </Button>
      )}
    </div>
  );
};
