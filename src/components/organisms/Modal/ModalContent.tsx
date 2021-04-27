import React, { useEffect } from 'react';

import { useReactiveVar } from '@apollo/client';
import AddMemberModal from '@components/modals/AddMember/AddMember';
import CheckInModal from '@components/modals/CheckIn/CheckIn';
import EventForm from '@components/modals/EventForm/EventForm';
import ProfileModal from '@components/modals/ProfileModal/ProfileModal';
import { modalVar } from '@core/state/Modal.reactive';
import ApplicantsConfirmationForm from '@scenes/Applicants/ApplicantsConfirmationForm';
import ApplicantsViewModal from '@scenes/Applicants/ApplicantsViewModal';
import DatabaseDeleteMembersModalForm from '@scenes/Database/DatabaseDeleteMembersModalForm';
import EventsConfirmRsvpModal from '@scenes/Events/EventsConfirmRsvpModal';
import IndividualEventErrorModal from '@scenes/Events/IndividualEvent/IndividualEventErrorModal';
import ProfileMembershipForm from '@scenes/Profile/ProfileMembershipForm';
import ProfilePersonalModalForm from '@scenes/Profile/ProfilePersonalModalForm';
import ProfileSocialModalForm from '@scenes/Profile/ProfileSocialModalForm';
import { ModalType } from '@util/constants';
import { cx } from '@util/util';
import DatabaseDemoteMembersModalForm from '../../../scenes/Database/DatabaseDemoteMembersModalForm';
import DatabasePromoteMembersModalForm from '../../../scenes/Database/DatabasePromoteMembersModalForm';
import DeleteEventConfirmationForm from '../../modals/EventForm/DeleteEventConfirmationForm';
import ModalContainer from './ModalContainer';

const ModalCustomContent: React.FC = () => {
  const modalId: ModalType = useReactiveVar(modalVar)?.id;

  switch (modalId) {
    case ModalType.ADD_MEMBERS:
      return <AddMemberModal />;

    case ModalType.APPLICANT_CONFIRMATION:
      return <ApplicantsConfirmationForm />;

    case ModalType.CHECK_IN:
      return <CheckInModal />;

    case ModalType.CONFIRM_DELETE_EVENT:
      return <DeleteEventConfirmationForm />;

    case ModalType.CONFIRM_RSVP:
      return <EventsConfirmRsvpModal />;

    case ModalType.CREATE_EVENT:
      return <EventForm />;

    case ModalType.DELETE_MEMBERS:
      return <DatabaseDeleteMembersModalForm />;

    case ModalType.DEMOTE_MEMBERS:
      return <DatabaseDemoteMembersModalForm />;

    case ModalType.EDIT_MEMBERSHIP_INFORMATION:
      return <ProfileMembershipForm />;

    case ModalType.EDIT_PERSONAL_INFORMATION:
      return <ProfilePersonalModalForm />;

    case ModalType.EDIT_SOCIAL_MEDIA:
      return <ProfileSocialModalForm />;

    case ModalType.EVENT_ERROR:
      return <IndividualEventErrorModal />;

    case ModalType.PROFILE:
      return <ProfileModal />;

    case ModalType.PROMOTE_MEMBERS:
      return <DatabasePromoteMembersModalForm />;

    case ModalType.VIEW_APPLICANT:
      return <ApplicantsViewModal />;

    default:
      return null;
  }
};

const ModalContent: React.FC = () => {
  const className: string = useReactiveVar(modalVar)?.options?.className;
  const confirmation: boolean = useReactiveVar(modalVar)?.options?.confirmation;

  useEffect(
    () => () => {
      modalVar(null);
    },
    []
  );

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
