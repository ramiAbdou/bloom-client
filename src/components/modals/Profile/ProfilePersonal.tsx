import React from 'react';

import HeaderTag from '@components/atoms/Tag/HeaderTag';
import Row from '@components/containers/Row/Row';
import MailTo from '@components/molecules/MailTo';
import ProfilePicture from '@components/molecules/ProfilePicture/ProfilePicture';
import { IMember } from '@core/db/db.entities';
import IdStore from '@core/store/Id.store';
import useFindOneFull from '@gql/hooks/useFindOneFull';
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

  const { data: member, loading } = useFindOneFull(IMember, {
    fields: ['firstName', 'lastName'],
    where: { id: memberId }
  });

  if (loading) return null;

  const fullName: string = `${member.firstName} ${member.lastName}`;

  return <h1 className="mb-xs--nlc">{fullName}</h1>;
};

const ProfilePersonalTags: React.FC = () => {
  const memberId: string = IdStore.useStoreState((state) => state.id);

  const { data: member, loading } = useFindOneFull(IMember, {
    fields: ['memberType.id', 'memberType.name', 'position', 'role'],
    where: { id: memberId }
  });

  if (loading) return null;

  return (
    <Row wrap className="mb-ss--nlc" gap="xs">
      <HeaderTag show={!!member.role}>{member.role}</HeaderTag>
      <HeaderTag show={!!member.position}>{member.position}</HeaderTag>
      <HeaderTag>{member.memberType?.name}</HeaderTag>
    </Row>
  );
};

const ProfilePersonalEmail: React.FC = () => {
  const memberId: string = IdStore.useStoreState((state) => state.id);

  const { data: member, loading } = useFindOneFull(IMember, {
    fields: ['email'],
    where: { id: memberId }
  });

  if (loading) return null;

  return <MailTo className="mb-sm--nlc" email={member.email} />;
};

const ProfilePersonalBio: React.FC = () => {
  const memberId: string = IdStore.useStoreState((state) => state.id);

  const { data: member, loading } = useFindOneFull(IMember, {
    fields: ['bio'],
    where: { id: memberId }
  });

  if (loading) return null;

  return <p className="mb-sm--nlc ws-pre-wrap">{member.bio}</p>;
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
