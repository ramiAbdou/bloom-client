import React from 'react';

import Row from '@containers/Row/Row';
import Table from '@organisms/Table/Table.store';
import SearchBar from '@organisms/Table/TableSeachBar';
import { useStoreState } from '@store/Store';
import MemberDatabaseCopyButton from './MemberDatabaseCopyButton';
import DeleteMembersButton from './MemberDatabaseDeleteButton';
import MemberDatabaseExportButton from './MemberDatabaseExportButton';
import MemberDatabaseFilterButton from './MemberDatabaseFilterButton';
import MemberDatabasePromoteButton from './MemberDatabasePromoteButton';

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
      {isOwner && <MemberDatabasePromoteButton />}
      <DeleteMembersButton />
    </div>
  );
};

const MemberDatabaseActions: React.FC = () => (
  <Row spaceBetween align="baseline">
    <SearchBar placeholder="Search members..." />
    <MemberDatabaseFilterButton />
    <MemberDatabaseButtons />
  </Row>
);

export default MemberDatabaseActions;
