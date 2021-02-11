import React from 'react';

import HeaderTag from '@atoms/Tag/HeaderTag';
import Row from '@containers/Row/Row';
import useQuery from '@hooks/useQuery';
import MailTo from '@molecules/MailTo';
import ProfilePicture from '@molecules/ProfilePicture/ProfilePicture';
import { GET_USER, GetUserArgs } from '@store/Db/Db.gql';
import { IMember, IUser } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import MemberProfileStore from './MemberProfile.store';
import MemberProfileSocialContainer from './MemberProfileSocial';

const MemberProfilePersonalPicture: React.FC = () => {
  const userId = MemberProfileStore.useStoreState((store) => store.userId);

  const { pictureUrl, firstName, lastName }: IUser = useStoreState(({ db }) => {
    return db.byUserId[userId];
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
    const { firstName, lastName }: IUser = db.byUserId[userId];
    return `${firstName} ${lastName}`;
  });

  return <h1>{fullName}</h1>;
};

const MemberProfilePersonalTags: React.FC = () => {
  const memberId = MemberProfileStore.useStoreState((store) => store.memberId);

  const role = useStoreState(({ db }) => {
    return db.byMemberId[memberId]?.role;
  });

  const type: string = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];
    return db.byTypeId[member.type]?.name;
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
    return db.byUserId[userId]?.email;
  });

  return <MailTo email={email} />;
};

const MemberProfilePersonalBio: React.FC = () => {
  const memberId = MemberProfileStore.useStoreState((store) => store.memberId);

  const bio = useStoreState(({ db }) => {
    return db.byMemberId[memberId]?.bio;
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

const MemberProfilePersonal: React.FC = () => {
  const userId = MemberProfileStore.useStoreState((store) => store.userId);

  useQuery<IUser, GetUserArgs>({
    fields: [
      'email',
      'facebookUrl',
      'id',
      'instagramUrl',
      'linkedInUrl',
      'twitterUrl'
    ],
    name: 'getUser',
    schema: Schema.USER,
    types: { userId: { required: false } },
    variables: { userId }
  });

  return (
    <div className="mo-member-profile-user-ctr">
      <MemberProfilePersonalPicture />
      <MemberProfilePersonalInformation />
      <MemberProfileSocialContainer />
    </div>
  );
};

export default MemberProfilePersonal;
