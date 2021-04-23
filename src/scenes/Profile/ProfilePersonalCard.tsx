import React from 'react';
import { memberIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Button from '@components/atoms/Button/Button';
import HeaderTag from '@components/atoms/Tag/HeaderTag';
import Card from '@components/containers/Card/Card';
import Row from '@components/containers/Row/Row';
import MailTo from '@components/molecules/MailTo';
import ProfilePicture from '@components/molecules/ProfilePicture/ProfilePicture';
import useFindOne from '@core/gql/hooks/useFindOne';
import { modalVar } from '@core/state/Modal.reactive';
import useBreakpoint from '@hooks/useBreakpoint';
import { ModalType } from '@util/constants';
import { IMember } from '@util/constants.entities';
import ProfileCardHeader, { ProfileEditButton } from './ProfileCardHeader';

const ProfilePersonalHeader: React.FC = () => {
  const memberId: string = useReactiveVar(memberIdVar);

  const { data: member, loading } = useFindOne(IMember, {
    fields: ['firstName', 'lastName'],
    where: { id: memberId }
  });

  if (loading) return null;

  const onClick = (): void => {
    modalVar({ id: ModalType.EDIT_PERSONAL_INFORMATION });
  };

  const fullName: string = `${member.firstName} ${member.lastName}`;

  return (
    <ProfileCardHeader canEdit h2 title={fullName} onEditClick={onClick} />
  );
};

const ProfilePersonalTagList: React.FC = () => {
  const memberId: string = useReactiveVar(memberIdVar);

  const { data: member, loading } = useFindOne(IMember, {
    fields: ['role', 'memberType.id', 'memberType.name'],
    where: { id: memberId }
  });

  if (loading) return null;

  return (
    <Row wrap gap="xs">
      <HeaderTag show={!!member.role}>{member.role}</HeaderTag>
      <HeaderTag>{member.memberType?.name}</HeaderTag>
    </Row>
  );
};

const ProfilePersonalEmail: React.FC = () => {
  const memberId: string = useReactiveVar(memberIdVar);

  const { data: member, loading } = useFindOne(IMember, {
    fields: ['email'],
    where: { id: memberId }
  });

  if (loading) return null;
  return <MailTo email={member.email} />;
};

const ProfilePersonalBio: React.FC = () => {
  const memberId: string = useReactiveVar(memberIdVar);

  const { data: member } = useFindOne(IMember, {
    fields: ['bio'],
    where: { id: memberId }
  });

  return member.bio ? <p className="ws-pre-wrap">{member.bio}</p> : null;
};

const ProfilePersonalOnboardingContainer: React.FC = () => {
  const memberId: string = useReactiveVar(memberIdVar);

  const { data: member, loading } = useFindOne(IMember, {
    fields: ['bio', 'pictureUrl'],
    where: { id: memberId }
  });

  if (loading || (member.bio && member.pictureUrl)) return null;

  const onClick = (): void => {
    modalVar({ id: ModalType.EDIT_PERSONAL_INFORMATION });
  };

  return (
    <Row spacing="xs">
      {!member.pictureUrl && (
        <Button primary onClick={onClick}>
          + Add Profile Picture
        </Button>
      )}

      {!member.bio && (
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
  const memberId: string = useReactiveVar(memberIdVar);
  const isMobile: boolean = useBreakpoint() === 1;

  const onClick = (): void => {
    modalVar({ id: ModalType.EDIT_PERSONAL_INFORMATION });
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
