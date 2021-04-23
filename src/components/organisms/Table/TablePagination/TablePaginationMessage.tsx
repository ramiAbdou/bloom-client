import React from 'react';

import { useTableState } from '../Table.state';
import TableStore from '../Table.store';
import { TableState } from '../Table.types';
import TablePaginationStore from './TablePagination.store';

const TablePaginationMessage: React.FC = () => {
  const { options }: TableState = useTableState();

  const floor: number = TablePaginationStore.useStoreState(
    (state) => state.floor
  );

  const ceiling: number = TablePaginationStore.useStoreState(
    (state) => state.ceiling
  );

  const rowsCount: number = TableStore.useStoreState(
    ({ filteredRows }) => filteredRows?.length
  );

  if (!options?.showCount) return null;

  const message: string = rowsCount
    ? `Displaying ${floor + 1}-${ceiling} of ${rowsCount} results.`
    : 'No results found.';

  return <p className="meta">{message}</p>;
};

export default TablePaginationMessage;
