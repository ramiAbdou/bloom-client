import React from 'react';

import HeaderTag from '@atoms/Tag/HeaderTag';
import Row from '@containers/Row/Row';
import Show from '@containers/Show';
import MailTo from '@molecules/MailTo';
import ProfilePicture from '@molecules/ProfilePicture/ProfilePicture';
import { IMember, IMemberType } from '@store/Db/entities';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
import ProfileSocialContainer from './ProfileSocial';
import useInitProfilePersonal from './useInitProfilePersonal';

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

  const fullName: string = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];
    return `${member.firstName} ${member.lastName}`;
  });

  return <h1 className="mb-xs--nlc">{fullName}</h1>;
};

const ProfilePersonalTags: React.FC = () => {
  const memberId: string = IdStore.useStoreState((state) => state.id);

  const role = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];
    return member.role;
  });

  const memberTypeName: string = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];
    const memberType: IMemberType = db.byMemberTypeId[member.memberType];
    return memberType?.name;
  });

  return (
    <Row className="mb-ss--nlc" spacing="xs">
      <HeaderTag show={!!role}>{role}</HeaderTag>
      <HeaderTag>{memberTypeName}</HeaderTag>
    </Row>
  );
};

const ProfilePersonalEmail: React.FC = () => {
  const memberId: string = IdStore.useStoreState((state) => state.id);

  const email: string = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];
    return member.email;
  });

  return <MailTo className="mb-sm--nlc" email={email} />;
};

const ProfilePersonalBio: React.FC = () => {
  const memberId: string = IdStore.useStoreState((state) => state.id);

  const bio: string = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];
    return member.bio;
  });

  return <p className="mb-sm--nlc">{bio}</p>;
};

const ProfilePersonal: React.FC = () => {
  const { loading } = useInitProfilePersonal();

  return (
    <Show show={!loading}>
      <div className="mb-sm--nlc">
        <ProfilePersonalPicture />
        <ProfilePersonalName />
        <ProfilePersonalTags />
        <ProfilePersonalEmail />
        <ProfilePersonalBio />
        <ProfileSocialContainer />
      </div>
    </Show>
  );
};

export default ProfilePersonal;
