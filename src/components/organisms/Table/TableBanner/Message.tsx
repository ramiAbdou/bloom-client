import React from 'react';

import Table from '../Table.store';

export default () => {
  const numTotalRows = Table.useStoreState(({ data }) => data.length);
  const range = Table.useStoreState((store) => store.range);

  const filteredData = Table.useStoreState((store) => store.filteredData);
  const numFilteredRows = filteredData.length;

  const selectedRowIds = Table.useStoreState((store) => store.selectedRowIds);
  const numSelectedRows = selectedRowIds.length;

  if (numSelectedRows === numTotalRows) {
    return (
      <p>
        All <span>{numTotalRows}</span> rows are selected.
      </p>
    );
  }

  if (numSelectedRows === numFilteredRows) {
    return (
      <p>
        All <span>{numFilteredRows}</span> filtered rows are selected.
      </p>
    );
  }

  if (
    filteredData
      .slice(range[0], range[1])
      .every(({ id }) => selectedRowIds.includes(id))
  ) {
    return (
      <p>
        All <span>100</span> rows on this page are selected.
      </p>
    );
  }

  return null;
};
