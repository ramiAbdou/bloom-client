import React from 'react';

import AddMemberModal from '@modals/AddMember/AddMember';
import Table from '@organisms/Table/Table';
import { TableColumn, TableRow } from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import { IMember, IUser } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import AdminDatabaseActions from './AdminDatabaseActions';
import AdminDatabaseDemoteModal from './AdminDatabaseDemoteModal';

const AdminDatabase: React.FC = () => {
  const rows: TableRow[] = useStoreState(({ db }) => {
    return db.community.members
      ?.map((memberId: string) => db.byMemberId[memberId])
      ?.filter((member: IMember) => !!member?.role && !!member?.user)
      ?.map((member: IMember) => {
        const user: IUser = db.byUserId[member.user];
        const { email, firstName, lastName } = user ?? {};
        return { email, firstName, id: member.id, lastName };
      }, []);
  });

  const isOwner = useStoreState(({ db }) => db.member?.role === 'OWNER');

  // We typically fetch the question ID from the backend, but here, we are
  // only displaying a limited number of columns so we hard-code them.
  const columns: TableColumn[] = [
    { id: 'firstName', title: 'First Name', type: 'SHORT_TEXT' },
    { id: 'lastName', title: 'Last Name', type: 'SHORT_TEXT' },
    { id: 'email', title: 'Email', type: 'SHORT_TEXT' }
  ];

  return (
    <>
      <Table
        columns={columns}
        options={{ hasCheckbox: isOwner, isClickable: true }}
        rows={rows}
      >
        <AdminDatabaseActions />
        <TableContent />
        <AdminDatabaseDemoteModal />
      </Table>

      <AddMemberModal admin />
    </>
  );
};

export default AdminDatabase;
