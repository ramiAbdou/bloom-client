import React from 'react';

import Button from '@atoms/Button/Button';
import useMutation from '@hooks/useMutation';
import { Schema } from '@store/Db/schema';
import { takeFirst } from '@util/util';
import {
  RESPOND_TO_APPLICANTS,
  RespondToApplicantsArgs
} from './Applicants.gql';

interface ApplicantsRespondButtonProps {
  all?: boolean;
  applicantIds: string[];
  response: 'ACCEPTED' | 'REJECTED';
}

const ApplicantsRespondButton: React.FC<ApplicantsRespondButtonProps> = ({
  all,
  applicantIds,
  response
}) => {
  const [respondToApplicants] = useMutation<boolean, RespondToApplicantsArgs>({
    name: 'respondToApplicants',
    query: RESPOND_TO_APPLICANTS,
    schema: [Schema.MEMBER],
    variables: { memberIds: applicantIds, response }
  });

  // If no pending applicants, shouldn't be able to respond to anything.
  if (!applicantIds?.length) return null;

  const onClick = async () => respondToApplicants();

  const buttonText = takeFirst([
    [response === 'ACCEPTED' && all, 'Accept All'],
    [response === 'ACCEPTED', 'Accept'],
    [response === 'REJECTED' && all, 'Reject All'],
    [response === 'REJECTED', 'Reject']
  ]);

  return (
    <Button
      primary={response === 'ACCEPTED'}
      secondary={response === 'REJECTED'}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  );
};

export default ApplicantsRespondButton;
