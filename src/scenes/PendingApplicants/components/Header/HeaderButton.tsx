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
  const communities = useStoreState((store) => store.communities);
  const updateEntities = useStoreActions((store) => store.updateEntities);

  const [respondToMemberships] = useMutation(RESPOND_TO_MEMBERSHIPS, {
    variables: { membershipIds: community.pendingApplicants, response }
  });

  const onClick = async () => {
    const { id, pendingApplicants } = community;

    // Call to the server.
    const { data, error } = await respondToMemberships();
    console.log(data, error);
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

  if (response === 'ACCEPTED')
    return <PrimaryButton title="Accept All" onClick={onClick} />;
  return <OutlineButton title="Ignore All" onClick={onClick} />;
};

export const AcceptAllButton = () => <HeaderButton response="ACCEPTED" />;
export const IgnoreAllButton = () => <HeaderButton response="REJECTED" />;
