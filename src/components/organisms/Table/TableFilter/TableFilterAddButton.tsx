import React from 'react';

import Button from '@atoms/Button/Button';
import TableFilterStore from './TableFilter.store';

const TableFilterAddButton: React.FC = () => {
  const addFilter = TableFilterStore.useStoreActions(
    (store) => store.addFilter
  );

  const onClick = () => addFilter();

  return (
    <Button tertiary className="mb-sm" onClick={onClick}>
      + Add Filter
    </Button>
  );
};

export default TableFilterAddButton;
