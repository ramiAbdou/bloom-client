import React from 'react';

import Row from '@components/containers/Row/Row';
import DirectoryAdminFilter from './DirectoryAdminFilter';
import DirectoryOpenFilterButton from './DirectoryOpenFilterButton';
import DirectorySearchBar from './DirectorySearchBar';

const DirectoryActionRow: React.FC = () => (
  <Row wrap className="mb-sm--nlc" gap="sm" justify="sb">
    <DirectorySearchBar />
    <DirectoryAdminFilter />
    <DirectoryOpenFilterButton />
  </Row>
);

export default DirectoryActionRow;
