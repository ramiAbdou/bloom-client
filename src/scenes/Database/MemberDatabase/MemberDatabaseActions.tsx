import React from 'react';

import Row from '@containers/Row/Row';
import { IMember, MemberRole } from '@db/db.entities';
import useFindOne from '@gql/hooks/useFindOne';
import TableStore from '@organisms/Table/Table.store';
import TableFilterButton from '@organisms/Table/TableFilterButton';
import SearchBar from '@organisms/Table/TableSeachBar';
import { useStoreState } from '@store/Store';
import MemberDatabaseCopyButton from './MemberDatabaseCopyButton';
import DeleteMembersButton from './MemberDatabaseDeleteButton';
import MemberDatabaseExportButton from './MemberDatabaseExportButton';
import MemberDatabasePromoteButton from './MemberDatabasePromoteButton';
import MemberDatabaseQuickFilters from './MemberDatabaseQuickFilters';

const MemberDatabaseButtons: React.FC = () => {
  const memberId: string = useStoreState(({ db }) => db.memberId);

  const { role } = useFindOne(IMember, {
    fields: ['role'],
    where: { id: memberId }
  });

  const isOwner: boolean = role === MemberRole.OWNER;

  const isAnythingSelected: boolean = TableStore.useStoreState(
    ({ selectedRowIds }) => !!selectedRowIds.length
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

const MemberDatabaseActions: React.FC = () => (
  <Row noMarginBottom wrap className="mb-sm--nlc" gap="sm" justify="sb">
    <SearchBar placeholder="Search members..." />
    <MemberDatabaseQuickFilters />
    <TableFilterButton className="ml-auto" />
    <MemberDatabaseButtons />
  </Row>
);

export default MemberDatabaseActions;
