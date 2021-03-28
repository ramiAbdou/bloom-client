import React from 'react';

import Row from '@containers/Row/Row';
import TableStore from '@organisms/Table/Table.store';
import TableFilterButton from '@organisms/Table/TableFilterButton';
import SearchBar from '@organisms/Table/TableSeachBar';
import { MemberRole } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import MemberDatabaseCopyButton from './MemberDatabaseCopyButton';
import DeleteMembersButton from './MemberDatabaseDeleteButton';
import MemberDatabaseExportButton from './MemberDatabaseExportButton';
import MemberDatabasePromoteButton from './MemberDatabasePromoteButton';
import MemberDatabaseQuickFilters from './MemberDatabaseQuickFilters';

const MemberDatabaseButtons: React.FC = () => {
  const isOwner: boolean = useStoreState(({ db }) => {
    return db.member?.role === MemberRole.OWNER;
  });

  const isAnythingSelected: boolean = TableStore.useStoreState(
    ({ selectedRowIds }) => {
      return !!selectedRowIds.length;
    }
  );

  return (
    <Row className="ml-auto" show={!!isAnythingSelected} spacing="xs">
      <MemberDatabaseCopyButton />
      <MemberDatabaseExportButton />
      {isOwner && <MemberDatabasePromoteButton />}
      <DeleteMembersButton />
    </Row>
  );
};

const MemberDatabaseActions: React.FC = () => {
  return (
    <Row noMarginBottom wrap className="mb-sm--nlc" gap="sm" justify="sb">
      <SearchBar placeholder="Search members..." />
      <MemberDatabaseQuickFilters />
      <TableFilterButton className="ml-auto" />
      <MemberDatabaseButtons />
    </Row>
  );
};

export default MemberDatabaseActions;
