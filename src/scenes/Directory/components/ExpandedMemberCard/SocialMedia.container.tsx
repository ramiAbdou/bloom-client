import deepequal from 'fast-deep-equal';
import React from 'react';
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoMailOutline
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
        <Button className="s-directory-modal-social s-directory-modal-social--facebook">
          <IoLogoFacebook />
        </Button>
      )}

      {linkedInUrl && (
        <Button className="s-directory-modal-social s-directory-modal-social--linkedin">
          <IoLogoLinkedin />
        </Button>
      )}

      {twitterUrl && (
        <Button className="s-directory-modal-social s-directory-modal-social--twitter">
          <IoLogoTwitter />
        </Button>
      )}

      {instagramUrl && (
        <Button className="s-directory-modal-social">
          <IoLogoInstagram />
        </Button>
      )}

      <Button className="s-directory-modal-social">
        <IoMailOutline />
      </Button>
    </div>
  );
};
