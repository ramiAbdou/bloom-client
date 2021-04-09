import React from 'react';

import Button from '@atoms/Button/Button';
import HeaderTag from '@atoms/Tag/HeaderTag';
import Card from '@containers/Card/Card';
import Row from '@containers/Row/Row';
import { IMember } from '@db/db.entities';
import useFindOne from '@gql/hooks/useFindOne';
import useBreakpoint from '@hooks/useBreakpoint';
import MailTo from '@molecules/MailTo';
import ProfilePicture from '@molecules/ProfilePicture/ProfilePicture';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType } from '@util/constants';
import ProfileCardHeader, { ProfileEditButton } from './ProfileCardHeader';

const ProfilePersonalHeader: React.FC = () => {
  const memberId: string = useStoreState(({ db }) => db.memberId);

  const { firstName, lastName } = useFindOne(IMember, {
    fields: ['firstName', 'lastName'],
    where: { id: memberId }
  });

  const fullName: string =
    firstName && lastName ? `${firstName} ${lastName}` : '';

  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const onClick = () => {
    showModal({ id: ModalType.EDIT_PERSONAL_INFORMATION });
  };

  return (
    <ProfileCardHeader canEdit h2 title={fullName} onEditClick={onClick} />
  );
};

const ProfilePersonalTagList: React.FC = () => {
  const memberId: string = useStoreState(({ db }) => db.memberId);

  const { memberType, role } = useFindOne(IMember, {
    fields: ['role', 'memberType.id', 'memberType.name'],
    where: { id: memberId }
  });

  return (
    <Row wrap gap="xs">
      <HeaderTag show={!!role}>{role}</HeaderTag>
      <HeaderTag>{memberType?.name}</HeaderTag>
    </Row>
  );
};

const ProfilePersonalEmail: React.FC = () => {
  const memberId: string = useStoreState(({ db }) => db.memberId);

  const { email } = useFindOne(IMember, {
    fields: ['email'],
    where: { id: memberId }
  });

  return <MailTo email={email} />;
};

const ProfilePersonalBio: React.FC = () => {
  const memberId: string = useStoreState(({ db }) => db.memberId);

  const { bio } = useFindOne(IMember, {
    fields: ['bio'],
    where: { id: memberId }
  });

  return bio ? <p className="ws-pre-wrap">{bio}</p> : null;
};

const ProfilePersonalOnboardingContainer: React.FC = () => {
  const memberId: string = useStoreState(({ db }) => db.memberId);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const { bio, pictureUrl } = useFindOne(IMember, {
    fields: ['bio', 'pictureUrl'],
    where: { id: memberId }
  });

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
  const memberId: string = useStoreState(({ db }) => db.memberId);
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const isMobile: boolean = useBreakpoint() === 1;

  const onClick = () => {
    showModal({ id: ModalType.EDIT_PERSONAL_INFORMATION });
  };

  return (
    <Row justify="sb">
      <ProfilePicture
        fontSize={36}
        memberId={memberId}
        size={isMobile ? 84 : 104}
      />
      <ProfileEditButton canEdit onEditClick={onClick} />
    </Row>
  );
};

const ProfilePersonalCard: React.FC = () => (
  <Card className="s-profile-card--personal">
    <ProfilePersonalPictureRow />
    <ProfilePersonalMainContent />
  </Card>
);

export default ProfilePersonalCard;
