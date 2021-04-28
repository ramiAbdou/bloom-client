import React from 'react';

import Button from '@components/atoms/Button/Button';
import {
  useTableDispatch,
  useTableState
} from '@components/organisms/Table/Table.state';
import { take } from '@util/util';
import { TableDispatch, TableRow, TableState } from './Table.types';

const TableBannerButton: React.FC = () => {
  const {
    filteredRows,
    isAllRowsSelected,
    selectedRowIds,
    totalCount
  }: TableState = useTableState();

  const tableDispatch: TableDispatch = useTableDispatch();

  const allRowIds: string[] = filteredRows.map((row: TableRow) => row.id);

  const onClick = (): void => {
    if (isAllRowsSelected) {
      tableDispatch({ type: 'TOGGLE_ALL_ROW_IDS' });
      return;
    }

    tableDispatch({ rowIds: allRowIds, type: 'TOGGLE_ROW_IDS' });
  };

  const title: string = take([
    [isAllRowsSelected, 'Clear Selection'],
    [
      filteredRows.every((filteredRow: TableRow) =>
        selectedRowIds.includes(filteredRow.id)
      ),
      `Select All ${totalCount} Rows in Database`
    ]
  ]);

  return (
    <Button tertiary onClick={onClick}>
      {title}
    </Button>
  );
};

export default TableBannerButton;
