import React from 'react';

import Checkbox from '@components/atoms/Checkbox/Checkbox';
import { TableState } from '@components/organisms/Table/Table.types';
import { getColumnIndex, useTableDispatch, useTableState } from './Table.state';
import TableStore from './Table.store';

interface TableRowCheckboxProps {
  columnId: string;
  rowId: string;
}

const TableRowCheckbox: React.FC<TableRowCheckboxProps> = ({
  columnId,
  rowId
}) => {
  const state: TableState = useTableState();
  const { options }: TableState = state;
  const tableDispatch = useTableDispatch();
  const columnIndex: number = getColumnIndex(state, { columnId });

  const isSelected: boolean = state.selectedRowIds.includes(rowId);

  const onChange = (): void => {
    tableDispatch({ rowIds: [rowId], type: 'TOGGLE_ROW_IDS' });
  };

  return (
    <Checkbox
      checked={isSelected}
      className="o-table-select"
      show={columnIndex === 0 && options.hasCheckbox}
      onChange={onChange}
    />
  );
};

export default TableRowCheckbox;
