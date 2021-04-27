import React from 'react';

import Checkbox from '@components/atoms/Checkbox/Checkbox';
import { useTableDispatch, useTableState } from './Table.state';
import { TableDispatch, TableRow, TableState } from './Table.types';

const TableHeaderCheckbox: React.FC = () => {
  const tableState: TableState = useTableState();
  const tableDispatch: TableDispatch = useTableDispatch();

  const {
    isAllRowsSelected,
    filteredRows,
    selectedRowIds
  }: TableState = tableState;

  const isSomeRowsSelectedOnPage: boolean =
    !!selectedRowIds.length &&
    filteredRows.some((filteredRow: TableRow) =>
      selectedRowIds.includes(filteredRow.id)
    );

  const onChange = (): void => {
    tableDispatch({
      rowIds: filteredRows.map((row: TableRow) => row.id),
      type: 'TOGGLE_ROW_IDS'
    });
  };

  return (
    <Checkbox
      checked={isAllRowsSelected || isSomeRowsSelectedOnPage}
      className="o-table-select"
      onChange={onChange}
    />
  );
};

export default TableHeaderCheckbox;
