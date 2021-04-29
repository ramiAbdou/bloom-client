import React from 'react';

import Button from '@components/atoms/Button/Button';
import { useTable } from '@components/organisms/Table/Table.state';

const FilterTablePanelAddButton: React.FC = () => {
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

export default FilterTablePanelAddButton;
