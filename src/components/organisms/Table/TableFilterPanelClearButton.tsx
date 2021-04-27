import React from 'react';

import Button from '@components/atoms/Button/Button';
import { useTableDispatch } from './Table.state';
import { TableDispatch } from './Table.types';

const TableFilterPanelClearButton: React.FC = () => {
  const tableDispatch: TableDispatch = useTableDispatch();

  const onClick = (): void => {
    tableDispatch({ type: 'CLEAR_FILTERS' });
  };

  return (
    <Button tertiary onClick={onClick}>
      Clear All
    </Button>
  );
};

export default TableFilterPanelClearButton;
