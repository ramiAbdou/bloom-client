import React from 'react';

import Checkbox from '@components/atoms/Checkbox/Checkbox';
import { useTableDispatch, useTableState } from './Table.state';
import TableStore from './Table.store';
import { TableRow, TableState } from './Table.types';
import TablePaginationStore from './TablePagination/TablePagination.store';

const TableHeaderCheckbox: React.FC = () => {
  const { selectedRowIds }: TableState = useTableState();
  const tableDispatch = useTableDispatch();

  const floor: number = TablePaginationStore.useStoreState(
    (state) => state.floor
  );

  const ceiling: number = TablePaginationStore.useStoreState(
    (state) => state.ceiling
  );

  const currentPageRowIds: string[] = TableStore.useStoreState((state) => {
    const rowsOnPage: TableRow[] = state.filteredRows.slice(floor, ceiling);
    return rowsOnPage.map((row: TableRow) => row.id);
  });

  const allRowsOnPageSelected: boolean = currentPageRowIds.every(
    (rowId: string) => selectedRowIds.includes(rowId)
  );

  const isAllPageSelected: boolean =
    !!selectedRowIds.length && allRowsOnPageSelected;

  const onChange = (): void => {
    tableDispatch({ rowIds: currentPageRowIds, type: 'TOGGLE_ROW_IDS' });
  };

  return (
    <Checkbox
      checked={isAllPageSelected}
      className="o-table-select"
      onChange={onChange}
    />
  );
};

export default TableHeaderCheckbox;
