import deepequal from 'fast-deep-equal';
import React from 'react';
import { IoClose, IoMail } from 'react-icons/io5';

import Button from '@components/Button/Button';
import { useStoreActions } from '@store/Store';
import MemberCard from '../MemberCard/MemberCard.store';
import SocialMedia from './SocialMedia.container';

const ProfilePicture = () => {
  const { pictureUrl, firstName, lastName } = MemberCard.useStoreState(
    (store) => store.member,
    deepequal
  );

  // pictureUrl =
  //   'https://pbs.twimg.com/profile_images/1303060784289730560/femQ8Zek_400x400.jpg';

  const initials = firstName[0] + lastName[0];

  return (
    <div className="s-directory-modal-pic">
      {!pictureUrl && <h1>{initials}</h1>}
      {pictureUrl && <img src={pictureUrl} />}
    </div>
  );
};

const Header = () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const onClick = () => closeModal();

  return (
    <div className="s-directory-modal-user-ctr-header">
      <ProfilePicture />

      <Button onClick={onClick}>
        <IoClose className="back-arrow" />
      </Button>
    </div>
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
        <Button className="s-directory-modal-email" href={`mailto:${email}`}>
          <IoMail />
          <p>{email}</p>
        </Button>
      )}
      {bio && <p className="s-directory-modal-bio">{bio}</p>}
    </div>
  );
};

export default () => (
  <div className="s-directory-modal-user-ctr">
    <Header />
    <PersonalInformation />
    <SocialMedia />
  </div>
);
