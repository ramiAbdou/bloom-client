import React from 'react';

import Table from '../Table.store';

const TableBannerMessage: React.FC = () => {
  const numTotalRows = Table.useStoreState(({ data }) => data.length);
  const range = Table.useStoreState((store) => store.range);

  const filteredData = Table.useStoreState((store) => store.filteredData);
  const numFilteredRows = filteredData.length;

  const selectedRowIds = Table.useStoreState((store) => store.selectedRowIds);
  const numSelectedRows = selectedRowIds.length;

  if (numSelectedRows === numTotalRows) {
    return <p>All {numTotalRows} rows are selected.</p>;
  }

  if (numSelectedRows === numFilteredRows) {
    return <p>All {numFilteredRows} filtered rows are selected.</p>;
  }

  if (
    filteredData
      .slice(range[0], range[1])
      .every(({ id }) => selectedRowIds.includes(id))
  ) {
    return <p>All 50 rows on this page are selected.</p>;
  }

  return null;
};

export default TableBannerMessage;
