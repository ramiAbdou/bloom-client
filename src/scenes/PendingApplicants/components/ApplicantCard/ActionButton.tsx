import { useMutation } from 'graphql-hooks';
import React from 'react';
import {
  IoCheckmarkCircle,
  IoChevronBackOutline,
  IoCloseCircle
} from 'react-icons/io5';

import Button from '@components/Button/Button';
import { useStoreActions } from '@store/Store';
import { RESPOND_TO_MEMBERSHIPS } from '../../PendingApplicants.gql';
import Applicant from './ApplicantCard.store';

// In the context of the ExpandedCard, which exits the modal.
export const BackButton = () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  return (
    <Button onClick={() => closeModal()}>
      <IoChevronBackOutline className="back-arrow" />
    </Button>
  );
};

export const AcceptButton = () => {
  const updateEntity = useStoreActions((store) => store.updateEntity);
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const applicantId = Applicant.useStoreState((store) => store.applicant.id);

  const [respondToMemberships] = useMutation(RESPOND_TO_MEMBERSHIPS, {
    variables: { membershipIds: [applicantId], response: 'ACCEPTED' }
  });

  const onClick = async () => {
    // Call to the server.
    const { data } = await respondToMemberships();
    if (!data?.respondToMemberships) return;

    updateEntity({
      entityName: 'memberships',
      id: applicantId,
      updatedData: { status: 'ACCEPTED' }
    });

    showToast({ message: 'Application accepted.' });
  };

  return (
    <Button
      className="s-applicants-card-action"
      value="Accept"
      onClick={onClick}
    >
      <IoCheckmarkCircle />
    </Button>
  );
};

export const IgnoreButton = () => {
  const updateEntity = useStoreActions((store) => store.updateEntity);
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const applicantId = Applicant.useStoreState((store) => store.applicant.id);

  const [respondToMemberships] = useMutation(RESPOND_TO_MEMBERSHIPS, {
    variables: { membershipIds: [applicantId], response: 'REJECTED' }
  });

  const onClick = async () => {
    // Call to the server.
    const { data } = await respondToMemberships();
    if (!data?.respondToMemberships) return;

    updateEntity({
      entityName: 'memberships',
      id: applicantId,
      updatedData: { status: 'REJECTED' }
    });

    showToast({ message: 'Application ignored.' });
  };

  return (
    <Button
      className="s-applicants-card-action"
      value="Ignore"
      onClick={onClick}
    >
      <IoCloseCircle />
    </Button>
  );
};
