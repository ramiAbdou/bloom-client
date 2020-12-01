/**
 * @fileoverview Scene: ActionButton
 * @author Rami Abdou
 */

import { useMutation } from 'graphql-hooks';
import React from 'react';
import {
  IoIosCheckmarkCircle,
  IoIosCloseCircle,
  IoMdArrowBack
} from 'react-icons/io';

import Button from '@components/Button/Button';
import { ICommunity } from '@store/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { RESPOND_TO_MEMBERSHIPS } from '../../PendingApplicants.gql';
import Applicant from './ApplicantCard.store';

// In the context of the ExpandedCard, which exits the modal.
export const BackButton = () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  return (
    <Button onClick={() => closeModal()}>
      <IoMdArrowBack className="back-arrow" />
    </Button>
  );
};

export const AcceptButton = () => {
  const applicantId = Applicant.useStoreState((store) => store.applicant.id);
  const applicants = useStoreState(
    ({ community }) => community.pendingApplicants
  );
  const updateCommunity = useStoreActions((actions) => actions.updateCommunity);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const [respondToMemberships] = useMutation(RESPOND_TO_MEMBERSHIPS, {
    variables: { membershipIds: [applicantId], response: 'ACCEPTED' }
  });

  const onClick = async () => {
    // Call to the server.
    const { data } = await respondToMemberships();
    if (!data?.respondToMemberships) return;

    updateCommunity({
      pendingApplicants: applicants.filter((a: string) => a !== applicantId)
    });

    showToast({ message: 'Application accepted.' });
  };

  return (
    <Button
      className="s-applicants-card-action"
      value="Accept"
      onClick={onClick}
    >
      <IoIosCheckmarkCircle />
    </Button>
  );
};

export const IgnoreButton = () => {
  const communities = useStoreState(({ entities }) => entities.communities);
  const applicantId = Applicant.useStoreState((store) => store.applicant.id);
  const updateCommunity = useStoreActions((actions) => actions.updateCommunity);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const [respondToMemberships] = useMutation(RESPOND_TO_MEMBERSHIPS, {
    variables: { membershipIds: [applicantId], response: 'REJECTED' }
  });

  const onClick = async () => {
    const community: ICommunity = communities.byId[communities.activeId];
    const { pendingApplicants } = community;

    // Call to the server.
    const { data } = await respondToMemberships();
    if (!data?.respondToMemberships) return;

    updateCommunity({
      pendingApplicants: pendingApplicants.filter(
        (a: string) => a !== applicantId
      )
    });

    showToast({ message: 'Application ignored.' });
  };

  return (
    <Button
      className="s-applicants-card-action"
      value="Ignore"
      onClick={onClick}
    >
      <IoIosCloseCircle />
    </Button>
  );
};
