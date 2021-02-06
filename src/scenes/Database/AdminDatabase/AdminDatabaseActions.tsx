import React from 'react';

import Row from '@containers/Row/Row';
import TableStore from '@organisms/Table/Table.store';
import SearchBar from '@organisms/Table/TableSeachBar';
import { useStoreState } from '@store/Store';
import AdminDatabaseDeleteButton from './AdminDatabaseDeleteButton';
import AdminDatabaseDemoteButton from './AdminDatabaseDemoteButton';

const AdminDatabaseButtons: React.FC = () => {
  const isOwner = useStoreState(({ db }) => db.member?.role === 'OWNER');

  const isAnythingSelected = TableStore.useStoreState(
    ({ selectedRowIds }) => !!selectedRowIds.length
  );

  return (
    <Row show={!!isAnythingSelected && !!isOwner}>
      <AdminDatabaseDemoteButton />
      <AdminDatabaseDeleteButton />
    </Row>
  );
};

const AdminDatabaseActions: React.FC = () => (
  <Row spaceBetween align="baseline">
    <SearchBar placeholder="Search admins..." />
    <AdminDatabaseButtons />
  </Row>
);

export default AdminDatabaseActions;
