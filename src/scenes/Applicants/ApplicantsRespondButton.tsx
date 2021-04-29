import React from 'react';

import Button from '@components/atoms/Button/Button';
import { showModal } from '@components/organisms/Modal/Modal.state';
import { ModalType } from '@util/constants';
import { MemberStatus } from '@util/constants.entities';
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
  // If no pending applicants, shouldn't be able to respond to anything.
  if (!applicantIds?.length) return null;

  const onClick = (): void => {
    showModal({
      id: ModalType.CONFIRM_APPLICANT,
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
