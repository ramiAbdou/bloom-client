import React, { useEffect } from 'react';

import { ModalType } from '@constants';
import AddMemberModal from '@modals/AddMember/AddMember';
import CheckInModal from '@modals/CheckIn/CheckIn';
import EventForm from '@modals/Event/EventForm';
import PaymentModal from '@modals/Payment/Payment';
import ProfileModal from '@modals/Profile/Profile';
import ApplicantsModal from '@scenes/Applicants/ApplicantsModal';
import IntegrationsDetailsModal from '@scenes/Integrations/IntegrationsDetailsModal';
import IntegrationsMailchimpModal from '@scenes/Integrations/IntegrationsMailchimpModal';
import ProfileMembershipForm from '@scenes/Profile/ProfileMembershipForm';
import ProfilePersonalModal from '@scenes/Profile/ProfilePersonalModal';
import ProfileSocialModal from '@scenes/Profile/ProfileSocialModal';
import { useStoreActions, useStoreState } from '@store/Store';
import { cx } from '@util/util';
import ModalContainer from './ModalContainer';

const ModalCustomContent: React.FC = () => {
  const id: string = useStoreState(({ modal }) => modal.id);

  if (id === ModalType.ADD_ADMINS) return <AddMemberModal admin />;
  if (id === ModalType.ADD_MEMBERS) return <AddMemberModal />;
  if (id === ModalType.APPLICANT) return <ApplicantsModal />;

  if (
    [
      ModalType.CHANGE_MEMBERSHIP,
      ModalType.PAY_DUES,
      ModalType.UPDATE_PAYMENT_METHOD
    ].includes(id as ModalType)
  ) {
    return <PaymentModal />;
  }

  if (id === ModalType.CHECK_IN) return <CheckInModal />;
  if (id === ModalType.CREATE_EVENT) return <EventForm />;

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
  if (id === ModalType.PROFILE) return <ProfileModal />;

  return null;
};

const ModalContent: React.FC = () => {
  const className: string = useStoreState(({ modal }) => modal.className);
  const clearOptions = useStoreActions(({ modal }) => modal.clearOptions);

  const confirmation: boolean = useStoreState(
    ({ modal }) => modal.options?.confirmation
  );

  useEffect(() => {
    return () => clearOptions();
  }, []);

  const css = cx('c-modal', {
    'c-modal--confirmation': confirmation,
    [className]: className
  });

  return (
    <ModalContainer>
      <div className={css}>
        <ModalCustomContent />
      </div>
    </ModalContainer>
  );
};

export default ModalContent;
