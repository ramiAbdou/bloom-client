import deepequal from 'fast-deep-equal';
import React from 'react';

import { HeaderTag } from '@atoms/Tags';
import Row from '@containers/Row/Row';
import ProfilePicture from '@molecules/ProfilePicture';
import { useStoreState } from '@store/Store';
import MailTo from '../../../components/molecules/MailTo';
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
      href={pictureUrl}
      lastName={lastName}
      size={96}
    />
  );
};

const MemberFullName = () => {
  const firstName = MemberCard.useStoreState((store) => store?.firstName);
  const lastName = MemberCard.useStoreState((store) => store?.lastName);
  return <h1>{`${firstName} ${lastName}`}</h1>;
};

const MemberTagList: React.FC = () => {
  const role = MemberCard.useStoreState((store) => store?.role);
  const typeId = MemberCard.useStoreState((store) => store?.type);

  const type: string = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[typeId]?.name;
  });

  return (
    <Row gap="sm">
      {role && <HeaderTag>{role}</HeaderTag>}
      <HeaderTag>{type}</HeaderTag>
    </Row>
  );
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
  return <MailTo email={email} />;
};

const MemberBio = () => {
  const bio = MemberCard.useStoreState((store) => store?.bio);
  if (!bio) return null;
  return <p className="s-directory-modal-bio">{bio}</p>;
};

const PersonalInformation = () => (
  <div className="s-directory-modal-personal-ctr">
    <MemberFullName />
    <MemberTagList />
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
