import React from 'react';

import Row from '@components/containers/Row/Row';
import DatabaseAdminFilter from './DatabaseAdminFilter';

const DatabaseQuickFilterList: React.FC = () => (
  <Row wrap spacing="sm">
    <DatabaseAdminFilter />
  </Row>
);

export default DatabaseQuickFilterList;
