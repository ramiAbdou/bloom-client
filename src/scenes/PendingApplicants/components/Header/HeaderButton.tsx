/**
 * @fileoverview Scene: Header
 * @author Rami Abdou
 */

import { useMutation } from 'graphql-hooks';
import React from 'react';

import OutlineButton from '@components/Button/OutlineButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import { useStoreActions, useStoreState } from '@store/Store';
import { RESPOND_TO_MEMBERSHIPS } from '../../PendingApplicants.gql';

type HeaderButtonProps = { response: 'ACCEPTED' | 'REJECTED' };

const HeaderButton = ({ response }: HeaderButtonProps) => {
  const community = useStoreState((store) => store.community);
  const communities = useStoreState(({ entities }) => entities.communities);
  const updateEntities = useStoreActions((actions) => actions.updateEntities);
  const hasApplicants = !!community.pendingApplicants?.length;

  const [respondToMemberships] = useMutation(RESPOND_TO_MEMBERSHIPS, {
    variables: { membershipIds: community.pendingApplicants, response }
  });

  const onClick = async () => {
    const { id, pendingApplicants } = community;

    // Call to the server.
    const { data } = await respondToMemberships();
    if (!data?.respondToMemberships) return;

    updateEntities({
      updatedState: {
        communities: {
          ...communities,
          byId: {
            ...communities.byId,
            [id]: {
              ...community,
              pendingApplicants: pendingApplicants.filter(
                (applicantId: string) =>
                  !community.pendingApplicants.includes(applicantId)
              )
            }
          }
        }
      }
    });
  };

  const baseProps = { disabled: !hasApplicants, onClick };

  if (response === 'ACCEPTED')
    return (
      <PrimaryButton
        className="s-applicants-accept-all"
        {...baseProps}
        title="Accept All"
      />
    );

  return <OutlineButton title="Ignore All" {...baseProps} />;
};

export const AcceptAllButton = () => <HeaderButton response="ACCEPTED" />;
export const IgnoreAllButton = () => <HeaderButton response="REJECTED" />;
