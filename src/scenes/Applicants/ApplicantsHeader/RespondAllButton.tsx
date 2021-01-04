import React from 'react';

import Button from '@atoms/Button';
import useMutation from '@hooks/useMutation';
import { useStoreActions, useStoreState } from '@store/Store';
import { RESPOND_TO_MEMBERS, RespondToMembersArgs } from '../Applicants.gql';

interface RespondAllButtonProps {
  response: 'ACCEPTED' | 'REJECTED';
}

const ApplicantsHeaderRespondAllButton: React.FC<RespondAllButtonProps> = ({
  response
}) => {
  const updateEntities = useStoreActions(({ db }) => db.updateEntities);

  const pendingApplicantIds: string[] = useStoreState(({ db }) => {
    const { byId } = db.entities.members;
    return db.community?.members?.filter((memberId: string) => {
      return byId[memberId]?.status === 'PENDING';
    });
  });

  const [respondToMembers] = useMutation<boolean, RespondToMembersArgs>({
    name: 'respondToMembers',
    query: RESPOND_TO_MEMBERS,
    variables: { memberIds: pendingApplicantIds, response }
  });

  // If no pending applicants, shouldn't be able to respond to anything.
  if (!pendingApplicantIds?.length) return null;

  const onClick = async () => {
    // Call to the server.
    const { error } = await respondToMembers();
    if (error) return;

    updateEntities({
      entityName: 'members',
      ids: pendingApplicantIds,
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

export default ApplicantsHeaderRespondAllButton;
