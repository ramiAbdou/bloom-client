import deepequal from 'fast-deep-equal';
import React from 'react';
import { IoClose } from 'react-icons/io5';

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
      <Button onClick={onClick}>
        <IoClose className="back-arrow" />
      </Button>

      <ProfilePicture />
    </div>
  );
};

export default () => {
  const {
    bio,
    currentLocation,
    firstName,
    lastName
  } = MemberCard.useStoreState((store) => store.member, deepequal);

  return (
    <div className="s-directory-modal-user-ctr">
      <Header />
      <h1>{`${firstName} ${lastName}`}</h1>
      {currentLocation && <p>{currentLocation}</p>}
      {bio && <p>{bio}</p>}
      <SocialMedia />
    </div>
  );
};
