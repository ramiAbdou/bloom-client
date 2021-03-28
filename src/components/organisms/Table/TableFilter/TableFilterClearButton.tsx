import React from 'react';

import Button from '@atoms/Button/Button';
import TableStore from '../Table.store';
import TableFilterStore from './TableFilter.store';

const TableFilterClearButton: React.FC = () => {
  const clearCustomFilters = TableFilterStore.useStoreActions((store) => {
    return store.clearFilters;
  });

  const removeFilter = TableStore.useStoreActions((store) => {
    return store.removeFilter;
  });

  const onClick = () => {
    clearCustomFilters();
    removeFilter('FILTER_CUSTOM');
  };

  return (
    <Button tertiary onClick={onClick}>
      Clear All
    </Button>
  );
};

export default TableFilterClearButton;
