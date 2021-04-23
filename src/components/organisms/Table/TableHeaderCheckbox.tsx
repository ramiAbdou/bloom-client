import React from 'react';

import Checkbox from '@components/atoms/Checkbox/Checkbox';
import { getRange, useTableDispatch, useTableState } from './Table.state';
import { TableDispatch, TableRow, TableState } from './Table.types';

const TableHeaderCheckbox: React.FC = () => {
  const tableState: TableState = useTableState();
  const tableDispatch: TableDispatch = useTableDispatch();
  const { filteredRows, selectedRowIds }: TableState = tableState;

  const [floor, ceiling]: [number, number] = getRange(tableState);

  const rowsOnPage: TableRow[] = filteredRows.slice(floor, ceiling);
  const currentPageRowIds: string[] = rowsOnPage.map((row: TableRow) => row.id);

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
