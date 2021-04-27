import React from 'react';

import Button from '@components/atoms/Button/Button';
import { useTableDispatch } from './Table.state';
import { TableDispatch } from './Table.types';

const TableFilterPanelAddButton: React.FC = () => {
  const tableDispatch: TableDispatch = useTableDispatch();

  const onClick = (): void => {
    tableDispatch({ type: 'ADD_FILTER' });
  };

  return (
    <Button tertiary className="mb-sm--nlc" onClick={onClick}>
      + Add Filter
    </Button>
  );
};

export default TableFilterPanelAddButton;
