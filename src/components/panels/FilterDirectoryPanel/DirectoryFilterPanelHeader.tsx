import React from 'react';

import Row from '@components/containers/Row/Row';
import DirectoryFilterPanelClearButton from './DirectoryFilterPanelClearButton';

const DirectoryFilterPanelHeader: React.FC = () => (
  <Row className="mx-xs my-sm" justify="sb" spacing="xs">
    <h3>Filters</h3>
    <DirectoryFilterPanelClearButton />
  </Row>
);

export default DirectoryFilterPanelHeader;
