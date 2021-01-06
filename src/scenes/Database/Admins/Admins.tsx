import deepequal from 'fast-deep-equal';
import React from 'react';

import AddMemberModal from '@modals/AddMember/AddMember';
import Table from '@organisms/Table/Table';
import { Column, Row } from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import Loading from '@store/Loading.store';
import { useStoreState } from '@store/Store';
import ActionRow from './ActionRow';

export default () => {
  const rows: Row[] = useStoreState(({ db }) => {
    const { community } = db;
    const { members, users } = db.entities;
    const { byId: byMemberId } = members;
    const { byId: byUserId } = users;

    return community.members?.reduce((acc: Row[], memberId: string) => {
      const { id, role, user } = byMemberId[memberId] ?? {};
      if (!role || !id || !user) return acc;

      const { firstName, lastName, email } = byUserId[user] ?? {};

      return [
        ...acc,
        { Email: email, 'First Name': firstName, 'Last Name': lastName, id }
      ];
    }, []);
  }, deepequal);

  const isOwner = useStoreState(({ db }) => db.isOwner);
  const loading = Loading.useStoreState((store) => store.loading);

  const isStoreUpdated = useStoreState(
    ({ db }) => !!db.community.members?.length
  );

  // We typically fetch the question ID from the backend, but here, we are
  // only displaying a limited number of columns so we hard-code them.
  const columns: Column[] = [
    { id: 'First Name', title: 'First Name', type: 'SHORT_TEXT' },
    { id: 'Last Name', title: 'Last Name', type: 'SHORT_TEXT' },
    { id: 'Email', title: 'Email', type: 'SHORT_TEXT' }
  ];

  if (loading || !isStoreUpdated) return null;

  return (
    <>
      <Table
        columns={columns}
        options={{ hasCheckbox: isOwner, isClickable: true }}
        rows={rows}
      >
        <ActionRow />
        <TableContent />
      </Table>

      <AddMemberModal admin />
    </>
  );
};
