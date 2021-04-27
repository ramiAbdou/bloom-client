import React from 'react';

import Checkbox from '@components/atoms/Checkbox/Checkbox';
import { useTableDispatch, useTableState } from './Table.state';
import { TableDispatch, TableRow, TableState } from './Table.types';

const TableHeaderCheckbox: React.FC = () => {
  const tableState: TableState = useTableState();
  const tableDispatch: TableDispatch = useTableDispatch();
  const { filteredRows, selectedRowIds }: TableState = tableState;

  const allRowsOnPageSelected: boolean = filteredRows.every((row: TableRow) =>
    selectedRowIds.includes(row.id)
  );

  const isAllPageSelected: boolean =
    !!selectedRowIds.length && allRowsOnPageSelected;

  const onChange = (): void => {
    tableDispatch({
      rowIds: filteredRows.map((row: TableRow) => row.id),
      type: 'TOGGLE_ROW_IDS'
    });
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
