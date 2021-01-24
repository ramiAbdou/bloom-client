import React from 'react';

import Button from '@atoms/Button/Button';
import useMutation from '@hooks/useMutation';
import { useStoreActions } from '@store/Store';
import { takeFirst } from '@util/util';
import { RESPOND_TO_MEMBERS, RespondToMembersArgs } from './Applicants.gql';

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
  const updateEntities = useStoreActions(({ db }) => db.updateEntities);

  const [respondToMembers] = useMutation<boolean, RespondToMembersArgs>({
    name: 'respondToMembers',
    query: RESPOND_TO_MEMBERS,
    variables: { memberIds: applicantIds, response }
  });

  // If no pending applicants, shouldn't be able to respond to anything.
  if (!applicantIds?.length) return null;

  const onClick = async () => {
    // Call to the server.
    const { error } = await respondToMembers();
    if (error) return;

    updateEntities({
      entityName: 'members',
      ids: applicantIds,
      updatedData: {
        status: response === 'ACCEPTED' ? 'ACCEPTED' : 'REJECTED'
      }
    });
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
