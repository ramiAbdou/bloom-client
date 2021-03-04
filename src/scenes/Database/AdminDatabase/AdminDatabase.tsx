import React from 'react';

import ModalLocal from '@organisms/Modal/ModalLocal';
import Table from '@organisms/Table/Table';
import { TableColumn, TableRow } from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import { IMember, IUser, MemberRole } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { QuestionType } from '@util/constants';
import AdminDatabaseActions from './AdminDatabaseActions';

const AdminDatabase: React.FC = () => {
  const rows: TableRow[] = useStoreState(({ db }) => {
    return db.community.members
      ?.map((memberId: string) => db.byMemberId[memberId])
      ?.filter((member: IMember) => !!member?.role && !!member?.user)
      ?.map((member: IMember) => {
        const { firstName, lastName } = member;
        const user: IUser = db.byUserId[member.user];
        const { email } = user ?? {};
        return { email, firstName, id: member.id, lastName };
      }, []);
  });

  const isOwner = useStoreState(
    ({ db }) => db.member?.role === MemberRole.OWNER
  );

  // We typically fetch the question ID from the backend, but here, we are
  // only displaying a limited number of columns so we hard-code them.
  const columns: TableColumn[] = [
    { id: 'firstName', title: 'First Name', type: QuestionType.SHORT_TEXT },
    { id: 'lastName', title: 'Last Name', type: QuestionType.SHORT_TEXT },
    { id: 'email', title: 'Email', type: QuestionType.SHORT_TEXT }
  ];

  return (
    <Table columns={columns} options={{ hasCheckbox: isOwner }} rows={rows}>
      <AdminDatabaseActions />
      <TableContent />
      <ModalLocal />
    </Table>
  );
};

export default AdminDatabase;
