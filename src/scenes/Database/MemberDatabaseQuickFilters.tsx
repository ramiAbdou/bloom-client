import React from 'react';

import Row from '@components/containers/Row/Row';
import DatabaseAdminFilter from './DatabaseAdminFilter';

const MemberDatabaseQuickFilters: React.FC = () => (
  <Row wrap spacing="sm">
    <DatabaseAdminFilter />
  </Row>
);

export default MemberDatabaseQuickFilters;
