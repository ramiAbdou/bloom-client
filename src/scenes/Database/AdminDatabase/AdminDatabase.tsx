import React from 'react';

import ModalLocal from '@organisms/Modal/ModalLocal';
import Table from '@organisms/Table/Table';
import { TableColumn, TableRow } from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import { IMember, MemberRole } from '@db/db.entities';
import { useStoreState } from '@store/Store';
import { QuestionType } from '@util/constants';
import AdminDatabaseActions from './AdminDatabaseActions';

const AdminDatabase: React.FC = () => {
  const rows: TableRow[] = useStoreState(({ db }) =>
    db.community.members
      ?.map((memberId: string) => db.byMemberId[memberId])
      ?.filter((member: IMember) => !!member?.role)
      ?.map((member: IMember) => {
        const { email, firstName, lastName }: IMember = member;
        return { email, firstName, id: member.id, lastName };
      }, [])
  );

  const isOwner: boolean = useStoreState(
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
    <Table
      TableActions={AdminDatabaseActions}
      columns={columns}
      options={{ hasCheckbox: isOwner }}
    >
      <TableContent rows={rows} />
      <ModalLocal />
    </Table>
  );
};

export default AdminDatabase;
