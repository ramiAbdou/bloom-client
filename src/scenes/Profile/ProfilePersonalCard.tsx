import React from 'react';

import Button from '@atoms/Button/Button';
import HeaderTag from '@atoms/Tag/HeaderTag';
import Card from '@containers/Card/Card';
import Row from '@containers/Row/Row';
import useBreakpoint from '@hooks/useBreakpoint';
import MailTo from '@molecules/MailTo';
import ProfilePicture from '@molecules/ProfilePicture/ProfilePicture';
import { IMemberPlan, MemberRole } from '@store/Db/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType } from '@util/constants';
import ProfileCardHeader, { ProfileEditButton } from './ProfileCardHeader';

const ProfilePersonalHeader: React.FC = () => {
  const fullName: string = useStoreState(({ db }) => {
    return `${db.member.firstName} ${db.member.lastName}`;
  });

  const showModal = useStoreActions(({ modal }) => {
    return modal.showModal;
  });

  const onClick = () => {
    showModal({ id: ModalType.EDIT_PERSONAL_INFORMATION });
  };

  return (
    <ProfileCardHeader canEdit h2 title={fullName} onEditClick={onClick} />
  );
};

const ProfilePersonalTagList: React.FC = () => {
  const role: MemberRole = useStoreState(({ db }) => {
    return db.member.role;
  });

  const memberPlanName: string = useStoreState(({ db }) => {
    const memberPlan: IMemberPlan = db.byMemberPlanId[db.member.plan];
    return memberPlan?.name;
  });

  return (
    <Row wrap gap="xs">
      <HeaderTag show={!!role}>{role}</HeaderTag>
      <HeaderTag>{memberPlanName}</HeaderTag>
    </Row>
  );
};

const ProfilePersonalEmail: React.FC = () => {
  const email: string = useStoreState(({ db }) => {
    return db.member.email;
  });

  return <MailTo email={email} />;
};

const ProfilePersonalBio: React.FC = () => {
  const bio: string = useStoreState(({ db }) => {
    return db.member.bio;
  });

  if (!bio) return null;
  return <p>{bio}</p>;
};

const ProfilePersonalOnboardingContainer: React.FC = () => {
  const bio: string = useStoreState(({ db }) => {
    return db.member.bio;
  });

  const pictureUrl: string = useStoreState(({ db }) => {
    return db.member.pictureUrl;
  });

  const showModal = useStoreActions(({ modal }) => {
    return modal.showModal;
  });

  if (bio && pictureUrl) return null;

  const onClick = () => {
    return showModal({ id: ModalType.EDIT_PERSONAL_INFORMATION });
  };

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

const ProfilePersonalMainContent: React.FC = () => {
  return (
    <div className="s-profile-card--personal-main">
      <ProfilePersonalHeader />
      <ProfilePersonalTagList />
      <ProfilePersonalEmail />
      <ProfilePersonalBio />
      <ProfilePersonalOnboardingContainer />
    </div>
  );
};

const ProfilePersonalPictureRow: React.FC = () => {
  const showModal = useStoreActions(({ modal }) => {
    return modal.showModal;
  });

  const isMobile: boolean = useBreakpoint() === 1;

  const onClick = () => {
    showModal({ id: ModalType.EDIT_PERSONAL_INFORMATION });
  };

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
