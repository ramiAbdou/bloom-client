import React from 'react';

import Row from '@containers/Row/Row';
import Show from '@containers/Show';
import TableStore from '../Table.store';
import PaginationBar from './TablePaginationBar';

const TablePaginationMessage: React.FC = () => {
  const floor = TableStore.useStoreState(({ range }) => range[0] + 1);
  const ceiling = TableStore.useStoreState(({ range }) => range[1]);

  const rowsCount: number = TableStore.useStoreState(
    (store) => store.filteredRows?.length
  );

  const showCount = TableStore.useStoreState(
    ({ options }) => options.showCount
  );

  const message = rowsCount
    ? `Displaying ${floor}-${ceiling} of ${rowsCount} results.`
    : 'No results found.';

  return (
    <Show show={!!showCount}>
      <p className="meta">{message}</p>
    </Show>
  );
};

const TablePagination: React.FC = () => {
  const rowsCount: number = TableStore.useStoreState(
    (store) => store.filteredRows?.length
  );

  return (
    <Row wrap className="mt-sm" gap="sm" justify="sb">
      <TablePaginationMessage />
      {rowsCount >= 50 && <PaginationBar />}
    </Row>
  );
};

export default TablePagination;
