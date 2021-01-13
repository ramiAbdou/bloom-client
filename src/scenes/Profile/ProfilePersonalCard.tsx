import React from 'react';

import Button from '@atoms/Button';
import { HeaderTag } from '@atoms/Tags';
import Card from '@containers/Card/Card';
import Row from '@containers/Row/Row';
import ProfilePicture from '@molecules/ProfilePicture';
import { useStoreState } from '@store/Store';
import MailTo from '../../components/molecules/MailTo';
import ProfileCardHeader from './ProfileCardHeader';

const ProfilePersonalHeader: React.FC = () => {
  const fullName = useStoreState(({ db }) => {
    const { firstName, lastName } = db.user;
    return `${firstName} ${lastName}`;
  });

  return <ProfileCardHeader canEdit h2 title={fullName} />;
};

const ProfilePersonalTagList: React.FC = () => {
  const role = useStoreState(({ db }) => db.member.role);

  const type: string = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[db.member.type].name;
  });

  return (
    <Row gap="sm">
      {role && <HeaderTag>{role}</HeaderTag>}
      <HeaderTag>{type}</HeaderTag>
    </Row>
  );
};

const ProfilePersonalEmail: React.FC = () => {
  const email = useStoreState(({ db }) => db.user.email);
  return <MailTo email={email} />;
};

const ProfilePersonalOnboardingContainer: React.FC = () => {
  return (
    <Row gap="sm">
      <Button primary>+ Add Profile Picture</Button>
      <Button primary>+ Add Bio</Button>
    </Row>
  );
};

const ProfilePersonalMainContent: React.FC = () => {
  return (
    <div className="s-profile-card--personal-main">
      <ProfilePersonalHeader />
      <ProfilePersonalTagList />
      <ProfilePersonalEmail />
      <ProfilePersonalOnboardingContainer />
    </div>
  );
};

const ProfilePersonalCard: React.FC = () => {
  return (
    <Card className="s-profile-card--personal">
      <ProfilePicture circle fontSize={36} size={104} />
      <ProfilePersonalMainContent />
    </Card>
  );
};

export default ProfilePersonalCard;
