import React from 'react';

import Row from '@components/containers/Row/Row';
import { useTableState } from '@components/organisms/Table/Table.state';
import { TableState } from '@components/organisms/Table/Table.types';
import TableFilterButton from '@components/organisms/Table/TableFilterButton';
import useMemberRole from '@core/hooks/useMemberRole';
import { MemberRole } from '@util/constants.entities';
import DatabaseCopyMemberEmailsButton from './DatabaseCopyMemberEmailsButton';
import DatabaseDeleteMembersButton from './DatabaseDeleteMembersButton';
import DatabaseDemoteMembersButton from './DatabaseDemoteMembersButton';
import DatabaseExportMembersButton from './DatabaseExportMembersButton';
import DatabasePromoteMembersButton from './DatabasePromoteMembersButton';
import DatabaseQuickFilterList from './DatabaseQuickFilterList';
import DatabaseSearchBar from './DatabaseSearchBar';

const DatabaseActionRowButtonRow: React.FC = () => {
  const { selectedRowIds }: TableState = useTableState();
  const isAnythingSelected: boolean = !!selectedRowIds.length;

  const isOwner: boolean = useMemberRole() === MemberRole.OWNER;

  return (
    <Row className="ml-auto" show={!!isAnythingSelected} spacing="xs">
      <DatabaseCopyMemberEmailsButton />
      <DatabaseExportMembersButton />
      {isOwner && <DatabasePromoteMembersButton />}
      {isOwner && <DatabaseDemoteMembersButton />}
      <DatabaseDeleteMembersButton />
    </Row>
  );
};

const DatabaseActionRow: React.FC = () => (
  <Row noMarginBottom wrap className="mb-sm--nlc" gap="sm" justify="sb">
    <DatabaseSearchBar />
    <DatabaseQuickFilterList />
    <TableFilterButton className="ml-auto" />
    <DatabaseActionRowButtonRow />
  </Row>
);

export default DatabaseActionRow;
