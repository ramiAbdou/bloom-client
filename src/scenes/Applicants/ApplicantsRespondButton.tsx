import React from 'react';

import Button from '@atoms/Button';
import useMutation from '@hooks/useMutation';
import { useStoreActions } from '@store/Store';
import { RESPOND_TO_MEMBERS, RespondToMembersArgs } from './Applicants.gql';

interface ApplicantsRespondButtonProps {
  applicantIds: string[];
  response: 'ACCEPTED' | 'REJECTED';
}

const ApplicantsRespondButton: React.FC<ApplicantsRespondButtonProps> = ({
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

  return (
    <Button
      primary={response === 'ACCEPTED'}
      secondary={response === 'REJECTED'}
      onClick={onClick}
    >
      {response === 'ACCEPTED' ? 'Accept All' : 'Reject All'}
    </Button>
  );
};

export default ApplicantsRespondButton;
