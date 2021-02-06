import React from 'react';

import Show from '@containers/Show';
import TableStore from '../Table.store';
import PaginationBar from './TablePaginationBar';

const TablePaginationMessage: React.FC = () => {
  const floor = TableStore.useStoreState(({ range }) => range[0] + 1);
  const ceiling = TableStore.useStoreState(({ range }) => range[1]);

  const numRows = TableStore.useStoreState(
    (store) => store.filteredRows?.length
  );

  const showCount = TableStore.useStoreState(
    ({ options }) => options.showCount
  );

  const message = numRows
    ? `Displaying ${floor}-${ceiling} of ${numRows} results.`
    : 'No results found.';

  return (
    <Show show={!!showCount}>
      <p className="meta">{message}</p>
    </Show>
  );
};

const TablePagination: React.FC = () => {
  const numRows = TableStore.useStoreState(
    (store) => store.filteredRows?.length
  );

  return (
    <div className="o-table-pagination-ctr">
      <TablePaginationMessage />
      {numRows >= 50 && <PaginationBar />}
    </div>
  );
};

export default TablePagination;
