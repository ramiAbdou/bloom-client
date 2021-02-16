import React from 'react';

import Button from '@atoms/Button/Button';
import Row from '@containers/Row/Row';
import ListFilterStore from './ListFilter.store';

const ListFilterHeaderClearButton: React.FC = () => {
  const clearFilters = ListFilterStore.useStoreActions(
    (store) => store.clearFilters
  );

  const onClick = () => clearFilters();

  return (
    <Button tertiary onClick={onClick}>
      Clear Filters
    </Button>
  );
};

const ListFilterHeader: React.FC = () => {
  return (
    <Row className="mx-xs my-sm" justify="sb">
      <h3>Filters</h3>
      <ListFilterHeaderClearButton />
    </Row>
  );
};

export default ListFilterHeader;
