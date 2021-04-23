import React from 'react';
import { memberIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Row from '@components/containers/Row/Row';
import TableStore from '@components/organisms/Table/Table.store';
import TableFilterButton from '@components/organisms/Table/TableFilterButton';
import useFindOne from '@core/gql/hooks/useFindOne';
import { IMember, MemberRole } from '@util/constants.entities';
import MemberDatabaseCopyButton from './MemberDatabaseCopyButton';
import DeleteMembersButton from './MemberDatabaseDeleteButton';
import MemberDatabaseExportButton from './MemberDatabaseExportButton';
import MemberDatabasePromoteButton from './MemberDatabasePromoteButton';
import MemberDatabaseQuickFilters from './MemberDatabaseQuickFilters';
import MemberDatabaseSearchBar from './MemberDatabaseSearchBar';

const MemberDatabaseButtons: React.FC = () => {
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
    <Row className="ml-auto" show={!!isAnythingSelected} spacing="xs">
      <MemberDatabaseCopyButton />
      <MemberDatabaseExportButton />
      {isOwner && <MemberDatabasePromoteButton />}
      <DeleteMembersButton />
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
