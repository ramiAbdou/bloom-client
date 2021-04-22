import React from 'react';
import { communityIdVar, memberIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import ModalLocal from '@components/organisms/Modal/ModalLocal';
import Table from '@components/organisms/Table/Table';
import { TableColumn, TableRow } from '@components/organisms/Table/Table.types';
import TableContent from '@components/organisms/Table/TableContent';
import useFind from '@core/gql/hooks/useFind';
import useFindOne from '@core/gql/hooks/useFindOne';
import { QuestionType } from '@util/constants';
import { IMember, MemberRole } from '@util/constants.entities';
import AdminDatabaseActions from './AdminDatabaseActions';

const AdminDatabase: React.FC = () => {
  const communityId: string = useReactiveVar(communityIdVar);
  const memberId: string = useReactiveVar(memberIdVar);

  const { data: members, loading: loading1 } = useFind(IMember, {
    fields: ['email', 'firstName', 'lastName'],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    where: { communityId, role: { _ne: null } }
  });

  const rows: TableRow[] = members.map((member: IMember) => {
    const { email, firstName, lastName }: IMember = member;
    return { email, firstName, id: member.id, lastName };
  }, []);

  const { data: member, loading: loading2 } = useFindOne(IMember, {
    fields: ['role'],
    where: { id: memberId }
  });

  if (loading1 || loading2) return null;

  const isOwner: boolean = member.role === MemberRole.OWNER;

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
