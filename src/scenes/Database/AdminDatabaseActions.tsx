import React from 'react';

import Row from '@components/containers/Row/Row';
import TableStore from '@components/organisms/Table/Table.store';
import useMemberRole from '@core/hooks/useMemberRole';
import { MemberRole } from '@util/constants.entities';
import DatabaseDemoteButton from './DatabaseDemoteButton';

const AdminDatabaseButtons: React.FC = () => {
  const isAnythingSelected: boolean = TableStore.useStoreState(
    ({ selectedRowIds }) => !!selectedRowIds.length
  );

  const isOwner: boolean = useMemberRole() === MemberRole.OWNER;

  return (
    <Row show={!!isAnythingSelected && !!isOwner} spacing="xs">
      <DatabaseDemoteButton />
    </Row>
  );
};

const AdminDatabaseActions: React.FC = () => (
  <Row className="mb-sm--nlc" justify="sb" spacing="xs">
    <AdminDatabaseButtons />
  </Row>
);

export default AdminDatabaseActions;
