import React from 'react';

import { getRange, useTableState } from '../Table.state';
import { TableState } from '../Table.types';

const TablePaginationMessage: React.FC = () => {
  const tableState: TableState = useTableState();
  const { filteredRows, options }: TableState = tableState;

  // If showCount is disabled, don't show the count!
  if (!options?.showCount) return null;

  const [floor, ceiling]: [number, number] = getRange(tableState);
  const rowsCount: number = filteredRows?.length;

  const message: string = rowsCount
    ? `Displaying ${floor + 1}-${ceiling + 1} of ${rowsCount} results.`
    : 'No results found.';

  return <p className="meta">{message}</p>;
};

export default TablePaginationMessage;
