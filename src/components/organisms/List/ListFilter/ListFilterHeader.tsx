import React from 'react';

import Row from '@containers/Row/Row';
import ListFilterClearButton from './ListFilterClearButton';

const ListFilterHeader: React.FC = () => {
  return (
    <Row className="mx-xs my-sm" justify="sb">
      <h3>Filters</h3>
      <ListFilterClearButton />
    </Row>
  );
};

export default ListFilterHeader;
