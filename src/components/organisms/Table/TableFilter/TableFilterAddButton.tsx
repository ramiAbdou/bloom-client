import React from 'react';

import Button from '@atoms/Button/Button';
import TableFilterStore from './TableFilter.store';

const TableFilterAddButton: React.FC = () => {
  const addFilter = TableFilterStore.useStoreActions((store) => {
    return store.addFilter;
  });

  const onClick = () => {
    return addFilter();
  };

  return (
    <Button tertiary className="mb-sm--nlc" onClick={onClick}>
      + Add Filter
    </Button>
  );
};

export default TableFilterAddButton;
