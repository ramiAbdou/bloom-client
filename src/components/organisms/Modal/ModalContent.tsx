import { ActionCreator } from 'easy-peasy';
import React, { useEffect } from 'react';

import AddMemberModal from '@modals/AddMember/AddMember';
import CheckInModal from '@modals/CheckIn/CheckIn';
import EventForm from '@modals/EventForm/EventForm';
import PaymentModal from '@modals/Payment/Payment';
import ProfileModal from '@modals/Profile/Profile';
import ApplicantsConfirmationModal from '@scenes/Applicants/ApplicantsConfirmationModal';
import ApplicantsModal from '@scenes/Applicants/ApplicantsModal';
import IndividualEventErrorModal from '@scenes/Events/IndividualEvent/IndividualEventErrorModal';
import IntegrationsDetailsModal from '@scenes/Integrations/IntegrationsDetailsModal';
import IntegrationsMailchimpModal from '@scenes/Integrations/IntegrationsMailchimpModal';
import ProfileMembershipForm from '@scenes/Profile/ProfileMembershipForm';
import ProfilePersonalModal from '@scenes/Profile/ProfilePersonalModal';
import ProfileSocialModal from '@scenes/Profile/ProfileSocialModal';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType } from '@util/constants';
import { cx } from '@util/util';
import ModalContainer from './ModalContainer';

const ModalCustomContent: React.FC = () => {
  const modalId: ModalType = useStoreState(({ modal }) => modal.id);

  if (modalId === ModalType.ADD_ADMINS) {
    return <AddMemberModal admin />;
  }

  if (modalId === ModalType.ADD_MEMBERS) {
    return <AddMemberModal />;
  }

  if (modalId === ModalType.APPLICANT) {
    return <ApplicantsModal />;
  }

  if (modalId === ModalType.APPLICANT_CONFIRMATION) {
    return <ApplicantsConfirmationModal />;
  }

  if (
    [
      ModalType.CHANGE_MEMBERSHIP,
      ModalType.PAY_DUES,
      ModalType.UPDATE_PAYMENT_METHOD
    ].includes(modalId)
  ) {
    return <PaymentModal />;
  }

  if (modalId === ModalType.CHECK_IN) {
    return <CheckInModal />;
  }

  if (modalId === ModalType.CREATE_EVENT) {
    return <EventForm />;
  }

  if (modalId === ModalType.EDIT_MEMBERSHIP_INFORMATION) {
    return <ProfileMembershipForm />;
  }

  if (modalId === ModalType.EDIT_PERSONAL_INFORMATION) {
    return <ProfilePersonalModal />;
  }

  if (modalId === ModalType.EDIT_SOCIAL_MEDIA) {
    return <ProfileSocialModal />;
  }

  if (modalId === ModalType.EVENT_ERROR) {
    return <IndividualEventErrorModal />;
  }

  if (modalId === ModalType.INTEGRATIONS_DETAILS) {
    return <IntegrationsDetailsModal />;
  }

  if (modalId === ModalType.MAILCHIMP_FLOW) {
    return <IntegrationsMailchimpModal />;
  }

  if (modalId === ModalType.PROFILE) {
    return <ProfileModal />;
  }

  return null;
};

const ModalContent: React.FC = () => {
  const className: string = useStoreState(({ modal }) => modal.className);

  const clearOptions: ActionCreator<void> = useStoreActions(
    ({ modal }) => modal.clearOptions
  );

  const confirmation: boolean = useStoreState(
    ({ modal }) => modal.options?.confirmation
  );

  useEffect(() => () => clearOptions(), []);

  const css: string = cx(
    'c-modal',
    { 'c-modal--confirmation': confirmation },
    className
  );

  return (
    <ModalContainer>
      <div className={css}>
        <ModalCustomContent />
      </div>
    </ModalContainer>
  );
};

export default ModalContent;
