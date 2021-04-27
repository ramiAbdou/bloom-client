import React from 'react';

import Button from '@components/atoms/Button/Button';
import { useTable } from './Table.state';

const TableFilterPanelAddButton: React.FC = () => {
  const [_, tableDispatch] = useTable();

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
