import React from 'react';

import Row from '@containers/Row/Row';
import TableSeachBar from '@organisms/Table/TableSeachBar';
import IndividualEventTableFilters from './IndividualEventTableFilters';

const IndividualEventTableActions: React.FC = () => {
  return (
    <Row className="mb-sm--nlc" spacing="sm">
      <TableSeachBar placeholder="Search..." />
      <IndividualEventTableFilters />
    </Row>
  );
};

export default IndividualEventTableActions;
