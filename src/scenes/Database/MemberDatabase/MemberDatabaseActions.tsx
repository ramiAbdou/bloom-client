import React from 'react';

import Table from '@organisms/Table/Table.store';
import SearchBar from '@organisms/Table/TableSeachBar';
import { useStoreState } from '@store/Store';
import MemberDatabaseCopyButton from './MemberDatabaseCopyButton';
import DeleteMembersButton from './MemberDatabaseDeleteButton';
import MemberDatabaseExportButton from './MemberDatabaseExportButton';
import MemberDatabaseFilterButton from './MemberDatabaseFilterButton';
import PromoteToAdminIcon from './PromoteToAdminIcon';

const MemberDatabaseButtons = () => {
  const isOwner = useStoreState(({ db }) => db.member?.role === 'OWNER');

  const isAnythingSelected = Table.useStoreState(
    ({ selectedRowIds }) => !!selectedRowIds.length
  );

  if (!isAnythingSelected) return null;

  return (
    <div>
      <MemberDatabaseCopyButton />
      <MemberDatabaseExportButton />
      {isOwner && <PromoteToAdminIcon />}
      <DeleteMembersButton />
    </div>
  );
};

const MemberDatabaseActions: React.FC = () => (
  <div className="s-database-action-row">
    <SearchBar placeholder="Search members..." />
    <MemberDatabaseFilterButton />
    <MemberDatabaseButtons />
  </div>
);

export default MemberDatabaseActions;
