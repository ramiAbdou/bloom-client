import React from 'react';

import Button from '@atoms/Button/Button';
import { MemberStatus } from '@store/Db/entities';
import { useStoreActions } from '@store/Store';
import { take } from '@util/util';
import useRespondToApplicants from './useRespondToApplicants';

interface ApplicantsRespondButtonProps {
  all?: boolean;
  applicantIds: string[];
  response: MemberStatus.ACCEPTED | MemberStatus.REJECTED;
}

const ApplicantsRespondButton: React.FC<ApplicantsRespondButtonProps> = (
  args
) => {
  const { all, applicantIds, response } = args;
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const [respondToApplicants] = useRespondToApplicants({
    memberIds: applicantIds,
    response
  });

  // If no pending applicants, shouldn't be able to respond to anything.
  if (!applicantIds?.length) return null;

  const onClick = async (): Promise<void> => {
    await respondToApplicants();
    showToast({ message: `Member(s) have been ${response.toLowerCase()}.` });
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
