import React from 'react';

import Row from '@containers/Row/Row';
import TableStore from '@organisms/Table/Table.store';
import TableFilterButton from '@organisms/Table/TableFilter/TableFilterButton';
import SearchBar from '@organisms/Table/TableSeachBar';
import { MemberRole } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import MemberDatabaseCopyButton from './MemberDatabaseCopyButton';
import DeleteMembersButton from './MemberDatabaseDeleteButton';
import MemberDatabaseExportButton from './MemberDatabaseExportButton';
import MemberDatabasePromoteButton from './MemberDatabasePromoteButton';
import MemberDatabaseQuickFilters from './MemberDatabaseQuickFilters';

const MemberDatabaseButtons: React.FC = () => {
  const isOwner = useStoreState(
    ({ db }) => db.member?.role === MemberRole.OWNER
  );

  const isAnythingSelected = TableStore.useStoreState(({ selectedRowIds }) => {
    return !!selectedRowIds.length;
  });

  return (
    <Row show={!!isAnythingSelected} spacing="xs">
      <MemberDatabaseCopyButton />
      <MemberDatabaseExportButton />
      {isOwner && <MemberDatabasePromoteButton />}
      <DeleteMembersButton />
    </Row>
  );
};

const MemberDatabaseQuickContainer: React.FC = () => {
  return (
    <Row spacing="sm">
      <SearchBar placeholder="Search members..." />
      <MemberDatabaseQuickFilters />
    </Row>
  );
};

const MemberDatabaseActions: React.FC = () => (
  <Row className="mb-sm--nlc" justify="sb" spacing="xs">
    <MemberDatabaseQuickContainer />
    <TableFilterButton />
    <MemberDatabaseButtons />
  </Row>
);

export default MemberDatabaseActions;
