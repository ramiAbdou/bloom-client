import deepequal from 'fast-deep-equal';
import React from 'react';
import { IoMail } from 'react-icons/io5';

import ProfilePicture from '@components/Misc/ProfilePicture';
import MemberCard from '../Card/Card.store';
import SocialMediaContainer from './SocialMedia.container';

const UserProfilePicture = () => {
  const { pictureUrl, firstName, lastName } = MemberCard.useStoreState(
    (store) => store.member,
    deepequal
  );

  return (
    <ProfilePicture
      circle
      className="s-directory-modal-pic"
      firstName={firstName}
      fontSize={36}
      lastName={lastName}
      pictureUrl={pictureUrl}
      size={96}
    />
  );
};

const PersonalInformation = () => {
  const {
    bio,
    currentLocation,
    email,
    firstName,
    lastName
  } = MemberCard.useStoreState((store) => store.member, deepequal);

  return (
    <div className="s-directory-modal-personal-ctr">
      <h1>{`${firstName} ${lastName}`}</h1>
      {currentLocation && (
        <p className="s-directory-modal-location">{currentLocation}</p>
      )}
      {email && (
        <a className="s-directory-modal-email" href={`mailto:${email}`}>
          <IoMail />
          <p>{email}</p>
        </a>
      )}
      {bio && <p className="s-directory-modal-bio">{bio}</p>}
    </div>
  );
};

export default () => (
  <div className="s-directory-modal-user-ctr">
    <UserProfilePicture />
    <PersonalInformation />
    <SocialMediaContainer />
  </div>
);
