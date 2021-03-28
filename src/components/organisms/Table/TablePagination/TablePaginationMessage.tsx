import React from 'react';

import Show from '@containers/Show';
import TableStore from '../Table.store';
import TablePaginationStore from './TablePagination.store';

const TablePaginationMessage: React.FC = () => {
  const floor: number = TablePaginationStore.useStoreState((state) => {
    return state.floor;
  });

  const ceiling: number = TablePaginationStore.useStoreState((state) => {
    return state.ceiling;
  });

  const rowsCount: number = TableStore.useStoreState(({ filteredRows }) => {
    return filteredRows?.length;
  });

  const showCount: boolean = TableStore.useStoreState(({ options }) => {
    return options.showCount;
  });

  const message: string = rowsCount
    ? `Displaying ${floor + 1}-${ceiling} of ${rowsCount} results.`
    : 'No results found.';

  return (
    <Show show={!!showCount}>
      <p className="meta">{message}</p>
    </Show>
  );
};

export default TablePaginationMessage;
