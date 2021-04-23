import React from 'react';

import Row from '@components/containers/Row/Row';
import { useTableState } from '@components/organisms/Table/Table.tracked';
import { TableState } from '@components/organisms/Table/Table.types';
import TableFilterButton from '@components/organisms/Table/TableFilterButton';
import useMemberRole from '@core/hooks/useMemberRole';
import { MemberRole } from '@util/constants.entities';
import DatabaseCopyButton from './DatabaseCopyButton';
import DatabaseDeleteButton from './DatabaseDeleteButton';
import DatabasePromoteButton from './DatabasePromoteButton';
import MemberDatabaseQuickFilters from './MemberDatabaseQuickFilters';
import MemberDatabaseSearchBar from './MemberDatabaseSearchBar';

const MemberDatabaseButtons: React.FC = () => {
  const { selectedRowIds }: TableState = useTableState();
  const isAnythingSelected: boolean = !!selectedRowIds.length;

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
