import { useMutation } from 'graphql-hooks';
import React from 'react';

import OutlineButton from '@components/Button/OutlineButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import { useStoreActions, useStoreState } from '@store/Store';
import { RESPOND_TO_MEMBERSHIPS } from '../../PendingApplicants.gql';

type HeaderButtonProps = { response: 'ACCEPTED' | 'REJECTED' };

const HeaderButton = ({ response }: HeaderButtonProps) => {
  const community = useStoreState((store) => store.community);
  const updateCommunity = useStoreActions((actions) => actions.updateCommunity);
  const hasApplicants = !!community.pendingApplicants?.length;

  const [respondToMemberships] = useMutation(RESPOND_TO_MEMBERSHIPS, {
    variables: { membershipIds: community?.pendingApplicants, response }
  });

  const onClick = async () => {
    const { pendingApplicants } = community;

    // Call to the server.
    const { data } = await respondToMemberships();
    if (!data?.respondToMemberships) return;

    updateCommunity({
      pendingApplicants: pendingApplicants.filter(
        (applicantId: string) =>
          !community.pendingApplicants.includes(applicantId)
      )
    });
  };

  if (response === 'ACCEPTED')
    return (
      <PrimaryButton
        className="s-applicants-accept-all"
        disabled={!hasApplicants}
        title="Accept All"
        onClick={onClick}
      />
    );

  return (
    <OutlineButton
      disabled={!hasApplicants}
      title="Ignore All"
      onClick={onClick}
    />
  );
};

export const AcceptAllButton = () => <HeaderButton response="ACCEPTED" />;
export const IgnoreAllButton = () => <HeaderButton response="REJECTED" />;
