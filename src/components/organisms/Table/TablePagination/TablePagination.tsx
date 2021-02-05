import React from 'react';

import Table from '../Table.store';
import PaginationBar from './PaginationBar';

const TablePaginationMessage: React.FC = () => {
  const floor = Table.useStoreState(({ range }) => range[0] + 1);
  const ceiling = Table.useStoreState(({ range }) => range[1]);
  const numRows = Table.useStoreState((store) => store.filteredData.length);
  const showCount = Table.useStoreState(({ options }) => options.showCount);

  if (!showCount) return null;

  const message = numRows
    ? `Displaying ${floor}-${ceiling} of ${numRows} results.`
    : 'No results found.';

  return <p className="meta">{message}</p>;
};

const TablePagination: React.FC = () => {
  const numRows = Table.useStoreState((store) => store.filteredData.length);

  return (
    <div className="o-table-pagination-ctr">
      <TablePaginationMessage />
      {numRows >= 50 && <PaginationBar />}
    </div>
  );
};

export default TablePagination;
