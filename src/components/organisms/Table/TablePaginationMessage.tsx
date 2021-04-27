import React from 'react';

import { useTable, useTableRange } from './Table.state';

const TablePaginationMessage: React.FC = () => {
  const [{ options, totalCount }] = useTable();
  const [floor, ceiling]: [number, number] = useTableRange();

  // If showCount is disabled, don't show the count!
  if (!options?.showCount) return null;

  const message: string = totalCount
    ? `Displaying ${floor + 1}-${ceiling + 1} of ${totalCount} results.`
    : 'No results found.';

  return <p className="meta">{message}</p>;
};

export default TablePaginationMessage;
