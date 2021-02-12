import React from 'react';

import Button from '@atoms/Button/Button';
import useMutation from '@hooks/useMutation';
import { Schema } from '@store/Db/schema';
import { useStoreActions } from '@store/Store';
import { takeFirst } from '@util/util';
import { RespondToApplicantsArgs } from './Applicants.types';

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
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const [respondToApplicants] = useMutation<boolean, RespondToApplicantsArgs>({
    fields: ['id', 'status'],
    operation: 'respondToApplicants',
    schema: [Schema.MEMBER],
    types: {
      memberIds: { required: true, type: '[String!]' },
      response: { required: true }
    },
    variables: { memberIds: applicantIds, response }
  });

  // If no pending applicants, shouldn't be able to respond to anything.
  if (!applicantIds?.length) return null;

  const onClick = async () => {
    await respondToApplicants();
    showToast({ message: `Member(s) have been ${response.toLowerCase()}.` });
  };

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
