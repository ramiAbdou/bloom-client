import React from 'react';

import Table from '@organisms/Table/Table.store';
import SearchBar from '@organisms/Table/TableSeachBar';
import { useStoreState } from '@store/Store';
import AdminDatabaseDeleteButton from './AdminDatabaseDeleteButton';
import AdminDatabaseDemoteButton from './AdminDatabaseDemoteButton';

const AdminDatabaseButtons = () => {
  const isOwner = useStoreState(({ db }) => db.member?.role === 'OWNER');

  const isAnythingSelected = Table.useStoreState(
    ({ selectedRowIds }) => !!selectedRowIds.length
  );

  if (!isAnythingSelected || !isOwner) return null;

  return (
    <div>
      <AdminDatabaseDemoteButton />
      <AdminDatabaseDeleteButton />
    </div>
  );
};

const AdminDatabaseActions: React.FC = () => (
  <div className="s-database-action-row">
    <SearchBar placeholder="Search admins..." />
    <AdminDatabaseButtons />
  </div>
);

export default AdminDatabaseActions;
