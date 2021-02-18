import React from 'react';

import HeaderTag from '@atoms/Tag/HeaderTag';
import Row from '@containers/Row/Row';
import MailTo from '@molecules/MailTo';
import ProfilePicture from '@molecules/ProfilePicture/ProfilePicture';
import { IMember, IUser } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import Show from '../../containers/Show';
import ProfileStore from './Profile.store';
import ProfileSocialContainer from './ProfileSocial';
import useInitProfilePersonal from './useInitProfilePersonal';

const ProfilePersonalPicture: React.FC = () => {
  const userId = ProfileStore.useStoreState((store) => store.userId);

  return (
    <ProfilePicture className="mb-xs" fontSize={36} size={96} userId={userId} />
  );
};

const ProfilePersonalName: React.FC = () => {
  const userId = ProfileStore.useStoreState((store) => store.userId);

  const fullName: string = useStoreState(({ db }) => {
    const user: IUser = db.byUserId[userId];
    return `${user.firstName} ${user.lastName}`;
  });

  return <h1 className="mb-xs">{fullName}</h1>;
};

const ProfilePersonalTags: React.FC = () => {
  const memberId = ProfileStore.useStoreState((store) => store.memberId);

  const role = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];
    return member?.role;
  });

  const type: string = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];
    return db.byTypeId[member.type]?.name;
  });

  return (
    <Row className="mb-ss" spacing="xs">
      <HeaderTag show={!!role}>{role}</HeaderTag>
      <HeaderTag>{type}</HeaderTag>
    </Row>
  );
};

const ProfilePersonalEmail: React.FC = () => {
  const userId = ProfileStore.useStoreState((store) => store.userId);

  const email: string = useStoreState(({ db }) => {
    const user: IUser = db.byUserId[userId];
    return user.email;
  });

  return <MailTo className="mb-sm" email={email} />;
};

const ProfilePersonalBio: React.FC = () => {
  const memberId = ProfileStore.useStoreState((store) => store.memberId);

  const bio: string = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];
    return member?.bio;
  });

  return <p className="mb-sm">{bio}</p>;
};

const ProfilePersonal: React.FC = () => {
  const loading = useInitProfilePersonal();

  return (
    <Show show={!loading}>
      <div>
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
