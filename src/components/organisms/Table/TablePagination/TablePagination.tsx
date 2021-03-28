import React from 'react';

import Row from '@containers/Row/Row';
import Show from '@containers/Show';
import TableStore from '../Table.store';
import TablePaginationStore from './TablePagination.store';
import PaginationBar from './TablePaginationBar';
import useUpdateRange from './useUpdateRange';

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

const TablePagination: React.FC = () => {
  useUpdateRange();

  const rowsCount: number = TableStore.useStoreState((state) => {
    return state.filteredRows?.length;
  });

  return (
    <Row wrap className="mt-sm" gap="sm" justify="sb">
      <TablePaginationMessage />
      {rowsCount >= 25 && <PaginationBar />}
    </Row>
  );
};

export default TablePagination;
