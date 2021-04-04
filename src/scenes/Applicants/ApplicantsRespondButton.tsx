import { ActionCreator } from 'easy-peasy';
import React from 'react';

import Button from '@atoms/Button/Button';
import { ModalData } from '@organisms/Modal/Modal.types';
import { MemberStatus } from '@db/db.entities';
import { useStoreActions } from '@store/Store';
import { ModalType } from '@util/constants';
import { take } from '@util/util';

interface ApplicantsRespondButtonProps {
  all?: boolean;
  applicantIds: string[];
  response: MemberStatus.ACCEPTED | MemberStatus.REJECTED;
}

const ApplicantsRespondButton: React.FC<ApplicantsRespondButtonProps> = ({
  all,
  applicantIds,
  response
}) => {
  const showModal: ActionCreator<ModalData> = useStoreActions(
    ({ modal }) => modal.showModal
  );

  // If no pending applicants, shouldn't be able to respond to anything.
  if (!applicantIds?.length) return null;

  const onClick = (): void => {
    showModal({
      id: ModalType.APPLICANT_CONFIRMATION,
      metadata: { applicantIds, response }
    });
  };

  const buttonText: string = take([
    [response === MemberStatus.ACCEPTED && all, 'Accept All'],
    [response === MemberStatus.ACCEPTED, 'Accept'],
    [response === MemberStatus.REJECTED && all, 'Reject All'],
    [response === MemberStatus.REJECTED, 'Reject']
  ]);

  return (
    <Button
      primary={response === MemberStatus.ACCEPTED}
      secondary={response === MemberStatus.REJECTED}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  );
};

export default ApplicantsRespondButton;
