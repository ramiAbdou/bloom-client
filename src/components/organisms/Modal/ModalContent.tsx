import React, { useEffect } from 'react';

import AddMemberModal from '@components/modals/AddMember/AddMember';
import CheckInModal from '@components/modals/CheckIn/CheckIn';
import EventForm from '@components/modals/EventForm/EventForm';
import ProfileModal from '@components/modals/ProfileModal/ProfileModal';
import { useStoreActions, useStoreState } from '@core/store/Store';
import ApplicantsConfirmationForm from '@scenes/Applicants/ApplicantsConfirmationForm';
import ApplicantsModal from '@scenes/Applicants/ApplicantsModal';
import EventsConfirmRsvpForm from '@scenes/Events/EventsConfirmRsvpForm';
import IndividualEventErrorModal from '@scenes/Events/IndividualEvent/IndividualEventErrorModal';
import IntegrationsDetailsModal from '@scenes/Integrations/IntegrationsDetailsModal';
import IntegrationsMailchimpModal from '@scenes/Integrations/IntegrationsMailchimpModal';
import ProfileMembershipForm from '@scenes/Profile/ProfileMembershipForm';
import ProfilePersonalModal from '@scenes/Profile/ProfilePersonalModal';
import ProfileSocialModal from '@scenes/Profile/ProfileSocialModal';
import { ModalType } from '@util/constants';
import { cx } from '@util/util';
import DeleteEventConfirmationForm from '../../modals/EventForm/DeleteEventConfirmationForm';
import ModalContainer from './ModalContainer';

const ModalCustomContent: React.FC = () => {
  const modalId: ModalType = useStoreState(({ modal }) => modal.id);

  switch (modalId) {
    case ModalType.ADD_ADMINS:
      return <AddMemberModal admin />;

    case ModalType.ADD_MEMBERS:
      return <AddMemberModal />;

    case ModalType.APPLICANT:
      return <ApplicantsModal />;

    case ModalType.APPLICANT_CONFIRMATION:
      return <ApplicantsConfirmationForm />;

    case ModalType.CHECK_IN:
      return <CheckInModal />;

    case ModalType.CONFIRM_DELETE_EVENT:
      return <DeleteEventConfirmationForm />;

    case ModalType.CONFIRM_RSVP:
      return <EventsConfirmRsvpForm />;

    case ModalType.CREATE_EVENT:
      return <EventForm />;

    case ModalType.EDIT_MEMBERSHIP_INFORMATION:
      return <ProfileMembershipForm />;

    case ModalType.EDIT_PERSONAL_INFORMATION:
      return <ProfilePersonalModal />;

    case ModalType.EDIT_SOCIAL_MEDIA:
      return <ProfileSocialModal />;

    case ModalType.EVENT_ERROR:
      return <IndividualEventErrorModal />;

    case ModalType.INTEGRATIONS_DETAILS:
      return <IntegrationsDetailsModal />;

    case ModalType.MAILCHIMP_FLOW:
      return <IntegrationsMailchimpModal />;

    case ModalType.PROFILE:
      return <ProfileModal />;

    default:
      return null;
  }
};

const ModalContent: React.FC = () => {
  const className: string = useStoreState(({ modal }) => modal.className);

  const confirmation: boolean = useStoreState(
    ({ modal }) => modal.options?.confirmation
  );

  const clearOptions = useStoreActions(({ modal }) => modal.clearOptions);

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
