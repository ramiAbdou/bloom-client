import React, { useEffect } from 'react';

import { useReactiveVar } from '@apollo/client';
import AddMemberModal from '@components/modals/AddMemberModal/AddMemberModal';
import CheckInModal from '@components/modals/CheckInModal/CheckInModal';
import ConfirmDeleteEventModal from '@components/modals/CreateEventModal/ConfirmDeleteEventModal';
import CreateEventModal from '@components/modals/CreateEventModal/CreateEventModal';
import UpdateEventModal from '@components/modals/CreateEventModal/UpdateEventModal';
import ViewProfileModal from '@components/modals/ProfileModal/ProfileModal';
import { closeModal, modalVar } from '@components/organisms/Modal/Modal.state';
import ApplicantsConfirmApplicantsModal from '@scenes/Applicants/ApplicantsConfirmApplicantsModal';
import ViewApplicantModal from '@scenes/Applicants/ViewApplicantModal';
import DatabaseDeleteMembersModal from '@scenes/Database/DatabaseDeleteMembersModal';
import DatabaseDemoteMembersModal from '@scenes/Database/DatabaseDemoteMembersModal';
import DatabasePromoteMembersModal from '@scenes/Database/DatabasePromoteMembersModal';
import EventsConfirmRsvpModal from '@scenes/Events/EventsConfirmRsvpModal';
import ViewEventErrorModal from '@scenes/Events/ViewEventErrorModal';
import UpdateMembershipInformationModal from '@scenes/Profile/UpdateMembershipInformationModal';
import UpdatePersonalInformationModal from '@scenes/Profile/UpdatePersonalInformationModal';
import UpdateSocialInformationModal from '@scenes/Profile/UpdateSocialInformationModal';
import { ModalType } from '@util/constants';

const ModalContent: React.FC = () => {
  const modalId: ModalType = useReactiveVar(modalVar)?.id;

  useEffect(
    () => () => {
      closeModal();
    },
    []
  );

  switch (modalId) {
    case ModalType.ADD_MEMBER:
      return <AddMemberModal />;

    case ModalType.CHECK_IN:
      return <CheckInModal />;

    case ModalType.CONFIRM_APPLICANT:
      return <ApplicantsConfirmApplicantsModal />;

    case ModalType.CONFIRM_DELETE_EVENT:
      return <ConfirmDeleteEventModal />;

    case ModalType.CONFIRM_RSVP:
      return <EventsConfirmRsvpModal />;

    case ModalType.CREATE_EVENT:
      return <CreateEventModal />;

    case ModalType.DELETE_MEMBERS:
      return <DatabaseDeleteMembersModal />;

    case ModalType.DEMOTE_MEMBERS:
      return <DatabaseDemoteMembersModal />;

    case ModalType.PROMOTE_MEMBERS:
      return <DatabasePromoteMembersModal />;

    case ModalType.UPDATE_EVENT:
      return <UpdateEventModal />;

    case ModalType.UPDATE_MEMBERSHIP_INFORMATION:
      return <UpdateMembershipInformationModal />;

    case ModalType.UPDATE_PERSONAL_INFORMATION:
      return <UpdatePersonalInformationModal />;

    case ModalType.UPDATE_SOCIAL_INFORMATION:
      return <UpdateSocialInformationModal />;

    case ModalType.VIEW_APPLICANT:
      return <ViewApplicantModal />;

    case ModalType.VIEW_EVENT_ERROR:
      return <ViewEventErrorModal />;

    case ModalType.VIEW_PROFILE:
      return <ViewProfileModal />;

    default:
      return null;
  }
};

export default ModalContent;
