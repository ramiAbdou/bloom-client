import { useMutation } from 'graphql-hooks';
import React, { MutableRefObject } from 'react';
import {
  IoCheckmarkCircle,
  IoChevronBackOutline,
  IoCloseCircle
} from 'react-icons/io5';

import Button from '@components/Button/Button';
import useTooltip from '@hooks/useTooltip';
import { useStoreActions } from '@store/Store';
import { RESPOND_TO_MEMBERS } from '../../Applicants.gql';
import Applicant from './Card.store';

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
  const updateEntities = useStoreActions(({ db }) => db.updateEntities);
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const applicantId = Applicant.useStoreState((store) => store.applicant.id);

  const ref: MutableRefObject<HTMLElement> = useTooltip('Accept');

  const [respondToMembers] = useMutation(RESPOND_TO_MEMBERS, {
    variables: { memberIds: [applicantId], response: 'ACCEPTED' }
  });

  const onClick = async () => {
    // Call to the server.
    const { data } = await respondToMembers();
    if (!data?.respondToMembers) return;

    updateEntities({
      entityName: 'members',
      ids: [applicantId],
      updatedData: { status: 'ACCEPTED' }
    });

    showToast({ message: 'Application accepted.' });
  };

  return (
    <Button ref={ref} className="s-applicants-card-action" onClick={onClick}>
      <IoCheckmarkCircle />
    </Button>
  );
};

export const IgnoreButton = () => {
  const updateEntities = useStoreActions(({ db }) => db.updateEntities);
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const applicantId = Applicant.useStoreState((store) => store.applicant.id);

  const ref: MutableRefObject<HTMLElement> = useTooltip('Reject');

  const [respondToMembers] = useMutation(RESPOND_TO_MEMBERS, {
    variables: { memberIds: [applicantId], response: 'REJECTED' }
  });

  const onClick = async () => {
    // Call to the server.
    const { data } = await respondToMembers();
    if (!data?.respondToMembers) return;

    updateEntities({
      entityName: 'members',
      ids: [applicantId],
      updatedData: { status: 'REJECTED' }
    });

    showToast({ message: 'Application ignored.' });
  };

  return (
    <Button ref={ref} className="s-applicants-card-action" onClick={onClick}>
      <IoCloseCircle />
    </Button>
  );
};
