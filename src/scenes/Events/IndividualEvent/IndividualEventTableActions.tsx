import React from 'react';

import Row from '@components/containers/Row/Row';
import TableSeachBar from '@components/organisms/Table/TableSeachBar';
import IndividualEventTableFilters from './IndividualEventTableFilters';

const IndividualEventTableActions: React.FC = () => (
  <Row wrap align="start" gap="sm">
    <TableSeachBar placeholder="Search..." />
    <IndividualEventTableFilters />
  </Row>
);

export default IndividualEventTableActions;
