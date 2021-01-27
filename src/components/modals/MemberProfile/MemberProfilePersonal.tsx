import React from 'react';

import { HeaderTag } from '@atoms/Tags';
import Row from '@containers/Row/Row';
import MailTo from '@molecules/MailTo';
import ProfilePicture from '@molecules/ProfilePicture';
import { IMember, IUser } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import MemberProfileStore from './MemberProfile.store';
import MemberProfileSocialContainer from './MemberProfileSocial';

const MemberProfilePersonalPicture: React.FC = () => {
  const userId = MemberProfileStore.useStoreState((store) => store.userId);

  const { pictureUrl, firstName, lastName }: IUser = useStoreState(({ db }) => {
    const { byId: byUserId } = db.entities.users;
    return byUserId[userId];
  });

  return (
    <ProfilePicture
      circle
      className="mo-member-profile-pic"
      firstName={firstName}
      fontSize={36}
      href={pictureUrl}
      lastName={lastName}
      size={96}
    />
  );
};

const MemberProfilePersonalName: React.FC = () => {
  const userId = MemberProfileStore.useStoreState((store) => store.userId);

  const fullName: string = useStoreState(({ db }) => {
    const { byId: byUserId } = db.entities.users;
    const { firstName, lastName }: IUser = byUserId[userId];
    return `${firstName} ${lastName}`;
  });

  return <h1>{fullName}</h1>;
};

const MemberProfilePersonalTags: React.FC = () => {
  const memberId = MemberProfileStore.useStoreState((store) => store.memberId);

  const role = useStoreState(({ db }) => {
    const { byId: byMemberId } = db.entities.members;
    return byMemberId[memberId]?.role;
  });

  const type: string = useStoreState(({ db }) => {
    const { byId: byMemberId } = db.entities.members;
    const { byId: byTypeId } = db.entities.types;

    const member: IMember = byMemberId[memberId];
    return byTypeId[member.type]?.name;
  });

  return (
    <Row>
      {role && <HeaderTag>{role}</HeaderTag>}
      <HeaderTag>{type}</HeaderTag>
    </Row>
  );
};

const MemberProfilePersonalEmail: React.FC = () => {
  const userId = MemberProfileStore.useStoreState((store) => store.userId);

  const email: string = useStoreState(({ db }) => {
    const { byId: byUserId } = db.entities.users;
    return byUserId[userId]?.email;
  });

  return <MailTo email={email} />;
};

const MemberProfilePersonalBio: React.FC = () => {
  const memberId = MemberProfileStore.useStoreState((store) => store.memberId);

  const bio = useStoreState(({ db }) => {
    const { byId: byMemberId } = db.entities.members;
    return byMemberId[memberId]?.bio;
  });

  return <p className="mo-member-profile-bio">{bio}</p>;
};

const MemberProfilePersonalInformation: React.FC = () => (
  <div className="mo-member-profile-personal-ctr">
    <MemberProfilePersonalName />
    <MemberProfilePersonalTags />
    <MemberProfilePersonalEmail />
    <MemberProfilePersonalBio />
  </div>
);

const MemberProfilePersonal: React.FC = () => (
  <div className="mo-member-profile-user-ctr">
    <MemberProfilePersonalPicture />
    <MemberProfilePersonalInformation />
    <MemberProfileSocialContainer />
  </div>
);

export default MemberProfilePersonal;
