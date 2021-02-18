import React from 'react';

import { ModalType } from '@constants';
import AddMemberModal from '@modals/AddMember/AddMember';
import CheckInModal from '@modals/CheckIn/CheckIn';
import CreateEventModal from '@modals/Event/CreateEvent';
import PaymentModal from '@modals/Payment/Payment';
import MemberProfileModal from '@modals/Profile/Profile';
import ApplicantsModal from '@scenes/Applicants/ApplicantsModal';
import IntegrationsDetailsModal from '@scenes/Integrations/IntegrationsDetailsModal';
import IntegrationsMailchimpModal from '@scenes/Integrations/IntegrationsMailchimpModal';
import ProfileMembershipForm from '@scenes/Profile/ProfileMembershipForm';
import ProfilePersonalModal from '@scenes/Profile/ProfilePersonalModal';
import ProfileSocialModal from '@scenes/Profile/ProfileSocialModal';
import { useStoreState } from '@store/Store';
import { cx } from '@util/util';

const ModalCustomContent: React.FC = () => {
  const id: string = useStoreState(({ modal }) => modal.id);

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

  if (id === ModalType.INTEGRATIONS_DETAILS) {
    return <IntegrationsDetailsModal />;
  }

  if (id === ModalType.MAILCHIMP_FLOW) return <IntegrationsMailchimpModal />;
  if (id === ModalType.MEMBER_PROFILE) return <MemberProfileModal />;
  if (id === ModalType.PAY_DUES) return <PaymentModal />;

  return null;
};

const ModalContent: React.FC = () => {
  const className: string = useStoreState(({ modal }) => modal.className);

  const confirmation: boolean = useStoreState(
    ({ modal }) => modal.options?.confirmation
  );

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
