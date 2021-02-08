import React from 'react';

import { ModalType } from '@constants';
import AddMemberModal from '@modals/AddMember/AddMember';
import CheckInModal from '@modals/CheckIn/CheckIn';
import CreateEventModal from '@modals/CreateEvent/CreateEvent';
import MemberProfileModal from '@modals/MemberProfile/MemberProfile';
import PaymentModal from '@modals/Payment/Payment';
import ApplicantsModal from '@scenes/Applicants/ApplicantsModal';
import ProfileMembershipForm from '@scenes/Profile/ProfileMembershipForm';
import ProfilePersonalModal from '@scenes/Profile/ProfilePersonalModal';
import ProfileSocialModal from '@scenes/Profile/ProfileSocialModal';
import { cx } from '@util/util';
import ModalStore from './Modal.store';

const ModalCustomContent: React.FC = () => {
  const id: string = ModalStore.useStoreState((store) => store.id);

  if (id === ModalType.ADD_ADMINS) return <AddMemberModal admin />;
  if (id === ModalType.ADD_MEMBERS) return <AddMemberModal />;
  if (id === ModalType.APPLICANT) return <ApplicantsModal />;
  if (id === ModalType.CHANGE_MEMBERSHIP) return <PaymentModal />;
  if (id === ModalType.CHECK_IN) return <CheckInModal />;
  if (id === ModalType.CREATE_EVENT) return <CreateEventModal />;

  if (id === ModalType.EDIT_MEMBERSHIP_INFORMATION) {
    return <ProfileMembershipForm />;
  }

  if (id === ModalType.EDIT_PERSONAL_INFORMATION) {
    return <ProfilePersonalModal />;
  }

  if (id === ModalType.EDIT_SOCIAL_MEDIA) return <ProfileSocialModal />;
  if (id === ModalType.MEMBER_PROFILE) return <MemberProfileModal />;
  if (id === ModalType.PAY_DUES) return <PaymentModal />;

  return null;
};

const ModalContent: React.FC = () => {
  const className: string = ModalStore.useStoreState((store) => store.className);
  const confirmation: boolean = ModalStore.useStoreState((store) => store.options?.confirmation);

  const css = cx('c-modal', {
    'c-modal--confirmation': confirmation,
    [className]: className
  });

  return (
    <div className={css}>
      <ModalCustomContent />
    </div>
  );
};

export default ModalContent;
