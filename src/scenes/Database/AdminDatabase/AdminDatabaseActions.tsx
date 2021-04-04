import React from 'react';

import Row from '@containers/Row/Row';
import TableStore from '@organisms/Table/Table.store';
import SearchBar from '@organisms/Table/TableSeachBar';
import { MemberRole } from '@db/db.entities';
import { useStoreState } from '@store/Store';
import AdminDatabaseDeleteButton from './AdminDatabaseDeleteButton';
import AdminDatabaseDemoteButton from './AdminDatabaseDemoteButton';

const AdminDatabaseButtons: React.FC = () => {
  const isOwner = useStoreState(
    ({ db }) => db.member?.role === MemberRole.OWNER
  );

  const isAnythingSelected = TableStore.useStoreState(
    ({ selectedRowIds }) => !!selectedRowIds.length
  );

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
