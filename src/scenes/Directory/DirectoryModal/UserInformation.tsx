import deepequal from 'fast-deep-equal';
import React from 'react';
import { IoMail } from 'react-icons/io5';

import ProfilePicture from '@molecules/ProfilePicture';
import MemberCard from '../DirectoryCard/DirectoryCard.store';
import SocialMediaContainer from './SocialMedia';

const MemberProfilePicture = () => {
  const { pictureUrl, firstName, lastName } = MemberCard.useStoreState(
    (store) => store,
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

const MemberFullName = () => {
  const firstName = MemberCard.useStoreState((store) => store?.firstName);
  const lastName = MemberCard.useStoreState((store) => store?.lastName);
  return <h1>{`${firstName} ${lastName}`}</h1>;
};

const MemberCurrentLocation = () => {
  const currentLocation = MemberCard.useStoreState(
    (store) => store?.currentLocation
  );

  if (!currentLocation) return null;
  return <p className="s-directory-modal-location">{currentLocation}</p>;
};

const MemberEmail = () => {
  const email = MemberCard.useStoreState((store) => store?.email);
  if (!email) return null;

  return (
    <a className="s-directory-modal-email" href={`mailto:${email}`}>
      <IoMail />
      <p>{email}</p>
    </a>
  );
};

const MemberBio = () => {
  const bio = MemberCard.useStoreState((store) => store?.bio);
  if (!bio) return null;
  return <p className="s-directory-modal-bio">{bio}</p>;
};

const PersonalInformation = () => (
  <div className="s-directory-modal-personal-ctr">
    <MemberFullName />
    <MemberCurrentLocation />
    <MemberEmail />
    <MemberBio />
  </div>
);

export default () => (
  <div className="s-directory-modal-user-ctr">
    <MemberProfilePicture />
    <PersonalInformation />
    <SocialMediaContainer />
  </div>
);
