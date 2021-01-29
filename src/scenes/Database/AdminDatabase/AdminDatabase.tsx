import deepequal from 'fast-deep-equal';
import React from 'react';

import AddMemberModal from '@modals/AddMember/AddMember';
import Table from '@organisms/Table/Table';
import { TableColumn, TableRow } from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import { useStoreState } from '@store/Store';
import AdminDatabaseActions from './AdminDatabaseActions';

const AdminDatabase: React.FC = () => {
  const rows: TableRow[] = useStoreState(({ db }) => {
    const { byId: byMemberId } = db.entities.members;
    const { byId: byUserId } = db.entities.users;

    return db.community.members?.reduce((acc: TableRow[], memberId: string) => {
      const { id, role, user } = byMemberId[memberId] ?? {};
      if (!role || !id || !user) return acc;

      const { firstName, lastName, email } = byUserId[user] ?? {};

      return [
        ...acc,
        { Email: email, 'First Name': firstName, 'Last Name': lastName, id }
      ];
    }, []);
  }, deepequal);

  const isOwner = useStoreState(({ db }) => db.member?.role === 'OWNER');

  const isStoreUpdated = useStoreState(
    ({ db }) => !!db.community.members?.length
  );

  // We typically fetch the question ID from the backend, but here, we are
  // only displaying a limited number of columns so we hard-code them.
  const columns: TableColumn[] = [
    { id: 'First Name', title: 'First Name', type: 'SHORT_TEXT' },
    { id: 'Last Name', title: 'Last Name', type: 'SHORT_TEXT' },
    { id: 'Email', title: 'Email', type: 'SHORT_TEXT' }
  ];

  if (!isStoreUpdated) return null;

  return (
    <>
      <Table
        columns={columns}
        options={{ hasCheckbox: isOwner, isClickable: true }}
        rows={rows}
      >
        <AdminDatabaseActions />
        <TableContent />
      </Table>

      <AddMemberModal admin />
    </>
  );
};

export default AdminDatabase;
