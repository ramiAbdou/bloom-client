import React from 'react';

import Row from '@components/containers/Row/Row';
import FilterDirectoryPanelClearButton from './FilterDirectoryPanelClearButton';

const FilterDirectoryPanelHeader: React.FC = () => (
  <Row className="mx-xs my-sm" justify="sb" spacing="xs">
    <h3>Filters</h3>
    <FilterDirectoryPanelClearButton />
  </Row>
);

export default FilterDirectoryPanelHeader;
