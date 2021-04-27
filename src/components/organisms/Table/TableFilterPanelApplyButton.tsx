import React from 'react';

import Button from '@components/atoms/Button/Button';
import { useStoreActions } from '@core/store/Store';
import { useTableDispatch, useTableState } from './Table.state';
import { TableDispatch, TableState } from './Table.types';

// const processFilter = (args: ProcessFilterArgs) => {
//   const { columnId, operator, row, value } = args;
//   const rowValue: any = row[columnId]?.toString()?.toLowerCase();
//   const processedValue: string = value?.toString()?.toLowerCase();

//   if (operator === 'includes') return rowValue?.includes(processedValue);
//   if (operator === 'is') return rowValue === processedValue;
//   if (operator === 'is not') return rowValue !== processedValue;
//   return false;
// };

const TableFilterPanelApplyButton: React.FC = () => {
  const tableDispatch: TableDispatch = useTableDispatch();
  const { filters }: TableState = useTableState();
  const closePanel = useStoreActions(({ panel }) => panel.closePanel);

  const onClick = () => {
    tableDispatch({ type: 'APPLY_FILTERS' });
    closePanel();
  };

  return (
    <Button primary onClick={onClick}>
      Apply {filters?.length} Filters
    </Button>
  );
};

export default TableFilterPanelApplyButton;
