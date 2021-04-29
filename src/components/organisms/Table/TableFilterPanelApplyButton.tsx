import React from 'react';

import Button from '@components/atoms/Button/Button';
import { closePanel } from '@core/state/Panel.state';
import { useTable, useTableSelector } from './Table.state';
import { TableState } from './Table.types';

const TableFilterPanelApplyButton: React.FC = () => {
  const [_, tableDispatch] = useTable();

  const filterCount: number = useTableSelector(
    (state: TableState) => Object.keys(state.filters)?.length ?? 0
  );

  const onClick = () => {
    tableDispatch({ type: 'APPLY_FILTERS' });
    closePanel();
  };

  return (
    <Button primary onClick={onClick}>
      Apply {filterCount} Filters
    </Button>
  );
};

export default TableFilterPanelApplyButton;
