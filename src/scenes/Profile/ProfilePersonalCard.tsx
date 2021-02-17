import React from 'react';

import Button from '@atoms/Button/Button';
import HeaderTag from '@atoms/Tag/HeaderTag';
import { ModalType } from '@constants';
import Card from '@containers/Card/Card';
import Row from '@containers/Row/Row';
import useBreakpoint from '@hooks/useBreakpoint';
import MailTo from '@molecules/MailTo';
import ProfilePicture from '@molecules/ProfilePicture/ProfilePicture';
import { useStoreActions, useStoreState } from '@store/Store';
import ProfileCardHeader, { ProfileEditButton } from './ProfileCardHeader';

const ProfilePersonalHeader: React.FC = () => {
  const fullName = useStoreState(({ db }) => {
    const { firstName, lastName } = db.user;
    return `${firstName} ${lastName}`;
  });

  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const onClick = () => showModal({ id: ModalType.EDIT_PERSONAL_INFORMATION });

  return (
    <ProfileCardHeader canEdit h2 title={fullName} onEditClick={onClick} />
  );
};

const ProfilePersonalTagList: React.FC = () => {
  const role = useStoreState(({ db }) => db.member.role);

  const type: string = useStoreState(({ db }) => {
    return db.byTypeId[db.member.type]?.name;
  });

  return (
    <Row gap="xs">
      <HeaderTag show={!!role}>{role}</HeaderTag>
      <HeaderTag>{type}</HeaderTag>
    </Row>
  );
};

const ProfilePersonalEmail: React.FC = () => {
  const email = useStoreState(({ db }) => db.user.email);
  return <MailTo email={email} />;
};

const ProfilePersonalBio: React.FC = () => {
  const bio = useStoreState(({ db }) => db.member.bio);
  if (!bio) return null;
  return <p>{bio}</p>;
};

const ProfilePersonalOnboardingContainer: React.FC = () => {
  const bio = useStoreState(({ db }) => db.member.bio);
  const pictureUrl = useStoreState(({ db }) => db.user.pictureUrl);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  if (bio && pictureUrl) return null;

  const onClick = () => showModal({ id: ModalType.EDIT_PERSONAL_INFORMATION });

  return (
    <Row spacing="xs">
      {!pictureUrl && (
        <Button primary onClick={onClick}>
          + Add Profile Picture
        </Button>
      )}

      {!bio && (
        <Button primary onClick={onClick}>
          + Add Bio
        </Button>
      )}
    </Row>
  );
};

const ProfilePersonalMainContent: React.FC = () => (
  <div className="s-profile-card--personal-main">
    <ProfilePersonalHeader />
    <ProfilePersonalTagList />
    <ProfilePersonalEmail />
    <ProfilePersonalBio />
    <ProfilePersonalOnboardingContainer />
  </div>
);

const ProfilePersonalPictureRow: React.FC = () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const isMobile = useBreakpoint() === 1;
  const onClick = () => showModal({ id: ModalType.EDIT_PERSONAL_INFORMATION });

  return (
    <Row justify="sb">
      <ProfilePicture fontSize={36} size={isMobile ? 84 : 104} />
      <ProfileEditButton canEdit onEditClick={onClick} />
    </Row>
  );
};

const ProfilePersonalCard: React.FC = () => {
  return (
    <Card className="s-profile-card--personal">
      <ProfilePersonalPictureRow />
      <ProfilePersonalMainContent />
    </Card>
  );
};

export default ProfilePersonalCard;
