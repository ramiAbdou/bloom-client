import React from 'react';

import { getRange, useTableState } from './Table.state';
import { TableState } from './Table.types';

const TablePaginationMessage: React.FC = () => {
  const tableState: TableState = useTableState();
  const { options, totalCount }: TableState = tableState;

  // If showCount is disabled, don't show the count!
  if (!options?.showCount) return null;

  const [floor, ceiling]: [number, number] = getRange(tableState);

  const message: string = totalCount
    ? `Displaying ${floor + 1}-${ceiling + 1} of ${totalCount} results.`
    : 'No results found.';

  return <p className="meta">{message}</p>;
};

export default TablePaginationMessage;
