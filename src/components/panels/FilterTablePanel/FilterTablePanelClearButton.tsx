import React from 'react';

import Button from '@components/atoms/Button/Button';
import { useTable } from '@components/organisms/Table/Table.state';

const FilterTablePanelClearButton: React.FC = () => {
  const [_, tableDispatch] = useTable();

  const onClick = (): void => {
    tableDispatch({ type: 'CLEAR_FILTERS' });
  };

  return (
    <Button tertiary onClick={onClick}>
      Clear All
    </Button>
  );
};

export default FilterTablePanelClearButton;
