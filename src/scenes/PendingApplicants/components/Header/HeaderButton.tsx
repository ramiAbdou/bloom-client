import { useMutation } from 'graphql-hooks';
import React from 'react';

import OutlineButton from '@components/Button/OutlineButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import { useStoreActions, useStoreState } from '@store/Store';
import { RESPOND_TO_MEMBERS } from '../../PendingApplicants.gql';

type HeaderButtonProps = { response: 'ACCEPTED' | 'REJECTED' };

const HeaderButton = ({ response }: HeaderButtonProps) => {
  const updateEntities = useStoreActions((store) => store.updateEntities);

  const pendingApplicantIds: string[] = useStoreState(
    ({ community, entities }) => {
      const { byId } = entities.members;
      return community?.members?.filter((memberId: string) => {
        return byId[memberId]?.status === 'PENDING';
      });
    }
  );

  const [respondToMembers] = useMutation(RESPOND_TO_MEMBERS, {
    variables: { memberIds: pendingApplicantIds, response }
  });

  const onClick = async () => {
    // Call to the server.
    const { data } = await respondToMembers();
    if (!data?.respondToMembers) return;

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
      <PrimaryButton
        className="s-applicants-accept-all"
        disabled={!pendingApplicantIds?.length}
        title="Accept All"
        onClick={onClick}
      />
    );
  }

  return (
    <OutlineButton
      disabled={!pendingApplicantIds?.length}
      title="Ignore All"
      onClick={onClick}
    />
  );
};

export const AcceptAllButton = () => <HeaderButton response="ACCEPTED" />;
export const IgnoreAllButton = () => <HeaderButton response="REJECTED" />;
