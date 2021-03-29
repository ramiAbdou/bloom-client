import React from 'react';

import Button from '@atoms/Button/Button';
import TableStore from '../Table.store';
import TableFilterStore from './TableFilterPanel.store';

const TableFilterPanelClearButton: React.FC = () => {
  const clearFilters = TableFilterStore.useStoreActions(
    (state) => state.clearFilters
  );

  const removeFilter = TableStore.useStoreActions(
    (state) => state.removeFilter
  );

  const onClick = (): void => {
    clearFilters();
    removeFilter('FILTER_CUSTOM');
  };

  return (
    <Button tertiary onClick={onClick}>
      Clear All
    </Button>
  );
};

export default TableFilterPanelClearButton;
