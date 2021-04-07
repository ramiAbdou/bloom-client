import React from 'react';

import Row from '@containers/Row/Row';
import { IMember, MemberRole } from '@db/db.entities';
import useFindOne from '@gql/useFindOne';
import TableStore from '@organisms/Table/Table.store';
import SearchBar from '@organisms/Table/TableSeachBar';
import { useStoreState } from '@store/Store';
import AdminDatabaseDeleteButton from './AdminDatabaseDeleteButton';
import AdminDatabaseDemoteButton from './AdminDatabaseDemoteButton';

const AdminDatabaseButtons: React.FC = () => {
  const memberId: string = useStoreState(({ db }) => db.member.id);

  const { role } = useFindOne(IMember, {
    fields: ['role'],
    where: { id: memberId }
  });

  const isOwner: boolean = role === MemberRole.OWNER;

  const isAnythingSelected: boolean = TableStore.useStoreState(
    ({ selectedRowIds }) => !!selectedRowIds.length
  );

  return (
    <Row show={!!isAnythingSelected && !!isOwner} spacing="xs">
      <AdminDatabaseDemoteButton />
      <AdminDatabaseDeleteButton />
    </Row>
  );
};

const AdminDatabaseActions: React.FC = () => (
  <Row className="mb-sm--nlc" justify="sb" spacing="xs">
    <SearchBar placeholder="Search admins..." />
    <AdminDatabaseButtons />
  </Row>
);

export default AdminDatabaseActions;
