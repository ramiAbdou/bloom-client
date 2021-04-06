import React from 'react';

import HeaderTag from '@atoms/Tag/HeaderTag';
import Row from '@containers/Row/Row';
import { IMember } from '@db/db.entities';
import useFindOne from '@gql/useFindOne';
import MailTo from '@molecules/MailTo';
import ProfilePicture from '@molecules/ProfilePicture/ProfilePicture';
import IdStore from '@store/Id.store';
import ProfileSocialContainer from './ProfileSocial';

const ProfilePersonalPicture: React.FC = () => {
  const memberId: string = IdStore.useStoreState((state) => state.id);

  return (
    <ProfilePicture
      className="mb-xs--nlc"
      fontSize={36}
      memberId={memberId}
      size={96}
    />
  );
};

const ProfilePersonalName: React.FC = () => {
  const memberId: string = IdStore.useStoreState((state) => state.id);

  const { firstName, lastName } = useFindOne(IMember, {
    fields: ['firstName', 'lastName'],
    where: { id: memberId }
  });

  const fullName: string =
    firstName && lastName ? `${firstName} ${lastName}` : '';

  return <h1 className="mb-xs--nlc">{fullName}</h1>;
};

const ProfilePersonalTags: React.FC = () => {
  const memberId: string = IdStore.useStoreState((state) => state.id);

  const { memberType, position, role } = useFindOne(IMember, {
    fields: ['memberType.id', 'memberType.name', 'position', 'role'],
    where: { id: memberId }
  });

  return (
    <Row wrap className="mb-ss--nlc" gap="xs">
      <HeaderTag show={!!role}>{role}</HeaderTag>
      <HeaderTag show={!!position}>{position}</HeaderTag>
      <HeaderTag>{memberType.name}</HeaderTag>
    </Row>
  );
};

const ProfilePersonalEmail: React.FC = () => {
  const memberId: string = IdStore.useStoreState((state) => state.id);

  const { email } = useFindOne(IMember, {
    fields: ['email'],
    where: { id: memberId }
  });

  return <MailTo className="mb-sm--nlc" email={email} />;
};

const ProfilePersonalBio: React.FC = () => {
  const memberId: string = IdStore.useStoreState((state) => state.id);

  const { bio } = useFindOne(IMember, {
    fields: ['bio'],
    where: { id: memberId }
  });

  return <p className="mb-sm--nlc ws-pre-wrap">{bio}</p>;
};

const ProfilePersonal: React.FC = () => (
  <div className="mb-sm--nlc">
    <ProfilePersonalPicture />
    <ProfilePersonalName />
    <ProfilePersonalTags />
    <ProfilePersonalEmail />
    <ProfilePersonalBio />
    <ProfileSocialContainer />
  </div>
);

export default ProfilePersonal;
