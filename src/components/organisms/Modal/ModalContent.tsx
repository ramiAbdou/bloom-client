import React, { useEffect } from 'react';

import { useReactiveVar } from '@apollo/client';
import AddMemberModal from '@components/modals/AddMemberModal/AddMemberModal';
import CheckInModal from '@components/modals/CheckInModal/CheckInModal';
import ConfirmApplicantsModal from '@components/modals/ConfirmApplicantsModal/ConfirmApplicantsModal';
import ConfirmDeleteEventModal from '@components/modals/ConfirmDeleteEventModal/ConfirmDeleteEventModal';
import ConfirmRsvpModal from '@components/modals/ConfirmRsvpModal/ConfirmRsvpModal';
import CreateEventModal from '@components/modals/CreateEventModal/CreateEventModal';
import DeleteMembersModal from '@components/modals/DeleteMembersModal/DeleteMembersModal';
import DemoteMembersModal from '@components/modals/DemoteMembersModal/DemoteMembersModal';
import PromoteMembersModal from '@components/modals/PromoteMembersModal/PromoteMembersModal';
import UpdateEventModal from '@components/modals/UpdateEventModal/UpdateEventModal';
import UpdateMembershipInformationModal from '@components/modals/UpdateMembershipInformationModal/UpdateMembershipInformationModal';
import UpdatePersonalInformationModal from '@components/modals/UpdatePersonalInformationModal/UpdatePersonalInformationModal';
import UpdateSocialInformationModal from '@components/modals/UpdateSocialInformationModal/UpdateSocialInformationModal';
import ViewApplicantModal from '@components/modals/ViewApplicantModal/ViewApplicantModal';
import ViewEventErrorModal from '@components/modals/ViewEventErrorModal/ViewEventErrorModal';
import ViewProfileModal from '@components/modals/ViewProfileModal/ViewProfileModal';
import { closeModal, modalVar } from '@components/organisms/Modal/Modal.state';
import { ModalType } from '@components/organisms/Modal/Modal.types';

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

    case ModalType.CONFIRM_APPLICANTS:
      return <ConfirmApplicantsModal />;

    case ModalType.CONFIRM_DELETE_EVENT:
      return <ConfirmDeleteEventModal />;

    case ModalType.CONFIRM_RSVP:
      return <ConfirmRsvpModal />;

    case ModalType.CREATE_EVENT:
      return <CreateEventModal />;

    case ModalType.DELETE_MEMBERS:
      return <DeleteMembersModal />;

    case ModalType.DEMOTE_MEMBERS:
      return <DemoteMembersModal />;

    case ModalType.PROMOTE_MEMBERS:
      return <PromoteMembersModal />;

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
