import deepequal from 'fast-deep-equal';
import React from 'react';
import { IoClose, IoMail } from 'react-icons/io5';

import Button from '@components/Button/Button';
import ProfilePicture from '@components/Misc/ProfilePicture';
import { useStoreActions } from '@store/Store';
import MemberCard from '../Card/Card.store';
import SocialMediaContainer from './SocialMedia.container';

const Header = () => {
  const { pictureUrl, firstName, lastName } = MemberCard.useStoreState(
    (store) => store.member,
    deepequal
  );

  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const onClick = () => closeModal();

  return (
    <div className="s-directory-modal-user-ctr-header">
      <ProfilePicture
        circle
        className="s-directory-modal-pic"
        firstName={firstName}
        fontSize={36}
        lastName={lastName}
        pictureUrl={pictureUrl}
        size={96}
      />

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
        <a className="s-directory-modal-email" href={`mailto:${email}`}>
          <Button>
            <IoMail />
            <p>{email}</p>
          </Button>
        </a>
      )}
      {bio && <p className="s-directory-modal-bio">{bio}</p>}
    </div>
  );
};

export default () => (
  <div className="s-directory-modal-user-ctr">
    <Header />
    <PersonalInformation />
    <SocialMediaContainer />
  </div>
);
