import deepequal from 'fast-deep-equal';
import React, { useEffect } from 'react';

import TableContent from '@components/Table/Table';
import Table, { Column, Row, tableModel } from '@components/Table/Table.store';
import { useStoreState } from '@store/Store';
import Database from '../../Database.store';
import AddAdminStore from '../AddAdmin/AddAdmin.store';
import AddAdminModal from '../AddAdmin/AddAdminModal';
import ActionRow from './ActionRow';

const AdminTable = () => {
  const rows: Row[] = useStoreState(({ entities, community }) => {
    const { byId: byMemberId } = entities.members;
    const { byId: byUserId } = entities.users;

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

  const updateData = Table.useStoreActions((store) => store.updateData);

  // Used primarily for the removal of members. This will not update the
  // data if the number of members doesn't change.
  useEffect(() => {
    updateData(rows);
  }, [rows?.length]);

  return <TableContent />;
};

export default () => {
  const loading = Database.useStoreState((store) => store.loading);
  const isOwner = useStoreState((store) => store.isOwner);

  const isStoreUpdated = useStoreState(
    ({ community }) => !!community.members?.length
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
      <Table.Provider
        runtimeModel={{ ...tableModel, columns, select: isOwner }}
      >
        <ActionRow />
        <AdminTable />
      </Table.Provider>

      <AddAdminStore.Provider>
        <AddAdminModal />
      </AddAdminStore.Provider>
    </>
  );
};
