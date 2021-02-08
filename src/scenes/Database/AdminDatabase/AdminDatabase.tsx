import React from 'react';

import ModalStore from '@organisms/Modal/Modal.store';
import ModalLocal from '@organisms/Modal/ModalLocal';
import Table from '@organisms/Table/Table';
import { TableColumn, TableRow } from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import { IMember, IUser } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import AdminDatabaseActions from './AdminDatabaseActions';

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
    <ModalStore.Provider>
      <Table columns={columns} options={{ hasCheckbox: isOwner }} rows={rows}>
        <AdminDatabaseActions />
        <TableContent />
        <ModalLocal />
      </Table>
    </ModalStore.Provider>
  );
};

export default AdminDatabase;
