import React from 'react';

import Row from '@components/containers/Row/Row';
import DirectoryAdminFilter from './DirectoryAdminFilter';
import DirectoryFilterPanelOpenButton from './DirectoryFilterPanelOpenButton';
import DirectorySearchBar from './DirectorySearchBar';

const DirectoryActionRow: React.FC = () => (
  <Row wrap className="mb-sm--nlc" gap="sm" justify="sb">
    <DirectorySearchBar />
    <DirectoryAdminFilter />
    <DirectoryFilterPanelOpenButton />
  </Row>
);

export default DirectoryActionRow;
