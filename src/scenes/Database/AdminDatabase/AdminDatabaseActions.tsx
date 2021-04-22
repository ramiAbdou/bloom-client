import React from 'react';
import { memberIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Row from '@components/containers/Row/Row';
import TableStore from '@components/organisms/Table/Table.store';
import SearchBar from '@components/organisms/Table/TableSeachBar';
import useFindOne from '@core/gql/hooks/useFindOne';
import { IMember, MemberRole } from '@util/constants.entities';
import AdminDatabaseDeleteButton from './AdminDatabaseDeleteButton';
import AdminDatabaseDemoteButton from './AdminDatabaseDemoteButton';

const AdminDatabaseButtons: React.FC = () => {
  const memberId: string = useReactiveVar(memberIdVar);

  const isAnythingSelected: boolean = TableStore.useStoreState(
    ({ selectedRowIds }) => !!selectedRowIds.length
  );

  const { data: member, loading } = useFindOne(IMember, {
    fields: ['role'],
    where: { id: memberId }
  });

  if (loading) return null;

  const isOwner: boolean = member.role === MemberRole.OWNER;

  return (
    <Row show={!!isAnythingSelected && !!isOwner} spacing="xs">
      <AdminDatabaseDemoteButton />
      <AdminDatabaseDeleteButton />
    </Row>
  );
};

const AdminDatabaseActions: React.FC = () => (
  <Row className="mb-sm--nlc" justify="sb" spacing="xs">
    <SearchBar placeholder="Search admins..." />
    <AdminDatabaseButtons />
  </Row>
);

export default AdminDatabaseActions;
