import React from 'react';

import Row from '@components/containers/Row/Row';
import TableStore from '@components/organisms/Table/Table.store';
import SearchBar from '@components/organisms/Table/TableSeachBar';
import { IMember, MemberRole } from '@core/db/db.entities';
import { useStoreState } from '@core/store/Store';
import useFindOne from '@gql/hooks/useFindOne';
import AdminDatabaseDeleteButton from './AdminDatabaseDeleteButton';
import AdminDatabaseDemoteButton from './AdminDatabaseDemoteButton';

const AdminDatabaseButtons: React.FC = () => {
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
