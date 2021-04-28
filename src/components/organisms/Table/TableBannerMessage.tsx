import React from 'react';

import { useTableState } from '@components/organisms/Table/Table.state';
import { take } from '@util/util';
import { TableRow, TableState } from './Table.types';

const TableBannerMessage: React.FC = () => {
  const {
    isAllRowsSelected,
    filteredRows,
    rowsPerPage,
    selectedRowIds,
    totalCount
  }: TableState = useTableState();

  const message: string = take([
    [isAllRowsSelected, `All ${totalCount} rows are selected.`],
    [
      filteredRows.every((filteredRow: TableRow) =>
        selectedRowIds.includes(filteredRow.id)
      ),
      `All ${rowsPerPage} rows on this page are selected.`
    ]
  ]);

  return <p>{message}</p>;
};

export default TableBannerMessage;
