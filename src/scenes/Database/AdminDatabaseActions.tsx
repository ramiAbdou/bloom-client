import React from 'react';

import Row from '@components/containers/Row/Row';

const AdminDatabaseButtons: React.FC = () =>
  // const isAnythingSelected: boolean = TableStore.useStoreState(
  //   ({ selectedRowIds }) => !!selectedRowIds.length
  // );

  null;
// const isOwner: boolean = useMemberRole() === MemberRole.OWNER;

// return (
//   <Row show={!!isAnythingSelected && !!isOwner} spacing="xs">
//     <DatabaseDemoteButton />
//   </Row>
// );
const AdminDatabaseActions: React.FC = () => (
  <Row className="mb-sm--nlc" justify="sb" spacing="xs">
    <AdminDatabaseButtons />
  </Row>
);

export default AdminDatabaseActions;
