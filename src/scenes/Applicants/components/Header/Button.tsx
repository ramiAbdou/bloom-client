import React from 'react';

import Button from '@components/Button/Button';
import useMutation from '@hooks/useMutation';
import { useStoreActions, useStoreState } from '@store/Store';
import { RESPOND_TO_MEMBERS, RespondToMembersArgs } from '../../Applicants.gql';

type HeaderButtonProps = { response: 'ACCEPTED' | 'REJECTED' };

const HeaderButton = ({ response }: HeaderButtonProps) => {
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

  if (response === 'ACCEPTED') {
    return (
      <Button
        primary
        className="s-applicants-accept-all"
        disabled={!pendingApplicantIds?.length}
        onClick={onClick}
      >
        Accept All
      </Button>
    );
  }

  return (
    <Button outline disabled={!pendingApplicantIds?.length} onClick={onClick}>
      Ignore All
    </Button>
  );
};

export const AcceptAllButton = () => <HeaderButton response="ACCEPTED" />;
export const IgnoreAllButton = () => <HeaderButton response="REJECTED" />;
