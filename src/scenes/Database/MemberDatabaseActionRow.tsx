import React from 'react';

import Row from '@components/containers/Row/Row';
import TableStore from '@components/organisms/Table/Table.store';
import TableFilterButton from '@components/organisms/Table/TableFilterButton';
import useMemberRole from '@core/hooks/useMemberRole';
import { MemberRole } from '@util/constants.entities';
import DatabaseCopyButton from './DatabaseCopyButton';
import DatabaseDeleteButton from './DatabaseDeleteButton';
import DatabaseExportButton from './DatabaseExportButton';
import DatabasePromoteButton from './DatabasePromoteButton';
import MemberDatabaseQuickFilters from './MemberDatabaseQuickFilters';
import MemberDatabaseSearchBar from './MemberDatabaseSearchBar';

const MemberDatabaseButtons: React.FC = () => {
  const isAnythingSelected: boolean = TableStore.useStoreState(
    ({ selectedRowIds }) => !!selectedRowIds.length
  );

  const isOwner: boolean = useMemberRole() === MemberRole.OWNER;

  return (
    <Row className="ml-auto" show={!!isAnythingSelected} spacing="xs">
      <DatabaseCopyButton />
      {/* <DatabaseExportButton /> */}
      {isOwner && <DatabasePromoteButton />}
      <DatabaseDeleteButton />
    </Row>
  );
};

const MemberDatabaseActionRow: React.FC = () => (
  <Row noMarginBottom wrap className="mb-sm--nlc" gap="sm" justify="sb">
    <MemberDatabaseSearchBar />
    <MemberDatabaseQuickFilters />
    <TableFilterButton className="ml-auto" />
    <MemberDatabaseButtons />
  </Row>
);

export default MemberDatabaseActionRow;
