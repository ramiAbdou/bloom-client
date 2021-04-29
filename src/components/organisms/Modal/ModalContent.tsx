import React, { useEffect } from 'react';

import { useReactiveVar } from '@apollo/client';
import AddMemberModal from '@components/modals/AddMemberModal/AddMemberModal';
import CheckInModal from '@components/modals/CheckIn/CheckIn';
import DeleteEventConfirmationForm from '@components/modals/EventModalForm/DeleteEventConfirmationForm';
import EventModalCreateForm from '@components/modals/EventModalForm/EventModalCreateForm';
import EventModalUpdateForm from '@components/modals/EventModalForm/EventModalUpdateForm';
import ProfileModal from '@components/modals/ProfileModal/ProfileModal';
import { closeModal, modalVar } from '@components/organisms/Modal/Modal.state';
import ApplicantsConfirmationForm from '@scenes/Applicants/ApplicantsConfirmationForm';
import ApplicantsViewModal from '@scenes/Applicants/ApplicantsViewModal';
import DatabaseDeleteMembersModalForm from '@scenes/Database/DatabaseDeleteMembersModalForm';
import DatabaseDemoteMembersModalForm from '@scenes/Database/DatabaseDemoteMembersModalForm';
import DatabasePromoteMembersModalForm from '@scenes/Database/DatabasePromoteMembersModalForm';
import EventsConfirmRsvpModalForm from '@scenes/Events/EventsConfirmRsvpModalForm';
import IndividualEventErrorModal from '@scenes/Events/IndividualEventErrorModal';
import ProfileMembershipForm from '@scenes/Profile/ProfileMembershipForm';
import ProfilePersonalModalForm from '@scenes/Profile/ProfilePersonalModalForm';
import ProfileSocialModalForm from '@scenes/Profile/ProfileSocialModalForm';
import { ModalType } from '@util/constants';
import { cx } from '@util/util';
import ModalContainer from './ModalContainer';

const ModalCustomContent: React.FC = () => {
  const modalId: ModalType = useReactiveVar(modalVar)?.id;

  switch (modalId) {
    case ModalType.ADD_MEMBERS:
      return <AddMemberModal />;

    case ModalType.CHECK_IN:
      return <CheckInModal />;

    case ModalType.CONFIRM_APPLICANT:
      return <ApplicantsConfirmationForm />;

    case ModalType.CONFIRM_DELETE_EVENT:
      return <DeleteEventConfirmationForm />;

    case ModalType.CONFIRM_RSVP:
      return <EventsConfirmRsvpModalForm />;

    case ModalType.CREATE_EVENT:
      return <EventModalCreateForm />;

    case ModalType.DELETE_MEMBERS:
      return <DatabaseDeleteMembersModalForm />;

    case ModalType.DEMOTE_MEMBERS:
      return <DatabaseDemoteMembersModalForm />;

    case ModalType.PROMOTE_MEMBERS:
      return <DatabasePromoteMembersModalForm />;

    case ModalType.UPDATE_EVENT:
      return <EventModalUpdateForm />;

    case ModalType.UPDATE_MEMBERSHIP_INFORMATION:
      return <ProfileMembershipForm />;

    case ModalType.UPDATE_PERSONAL_INFORMATION:
      return <ProfilePersonalModalForm />;

    case ModalType.UPDATE_SOCIAL_INFORMATION:
      return <ProfileSocialModalForm />;

    case ModalType.VIEW_APPLICANT:
      return <ApplicantsViewModal />;

    case ModalType.VIEW_EVENT_ERROR:
      return <IndividualEventErrorModal />;

    case ModalType.VIEW_PROFILE:
      return <ProfileModal />;

    default:
      return null;
  }
};

const ModalContent: React.FC = () => {
  const className: string = useReactiveVar(modalVar)?.options?.className;
  const confirmation: boolean = useReactiveVar(modalVar)?.options?.confirmation;

  useEffect(
    () => () => {
      closeModal();
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
