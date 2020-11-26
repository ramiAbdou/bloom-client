/**
 * @fileoverview Scene: Action Row
 * @author Rami Abdou
 */

import { useMutation } from 'graphql-hooks';
import React from 'react';

import Trash from '@components/Icons/Trash';
import Table from '@components/Table/Table.store';
import { useStoreActions, useStoreState } from '@store/Store';
import { DELETE_MEMBERSHIPS } from '../../Database.gql';
import DatabaseAction from './DatabaseAction';

export default () => {
  const members = useStoreState((store) => store.community.members);
  const updateCommunity = useStoreActions((actions) => actions.updateCommunity);
  const membershipIds = Table.useStoreState(
    ({ selectedRowIds }) => selectedRowIds
  );

  const [deleteMemberships] = useMutation(DELETE_MEMBERSHIPS);

  const onClick = async () => {
    const { data } = await deleteMemberships({ variables: { membershipIds } });
    if (!data?.deleteMemberships) return;

    updateCommunity({
      members: members.filter(
        (memberId: string) => !membershipIds.includes(memberId)
      )
    });
  };

  return (
    <DatabaseAction Component={Trash} value="Delete Member" onClick={onClick} />
  );
};
