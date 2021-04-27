import React from 'react';

import Checkbox from '@components/atoms/Checkbox/Checkbox';
import {
  useIsTableRowSelected,
  useTable,
  useTableColumnIndex
} from './Table.state';

interface TableRowCheckboxProps {
  columnId: string;
  rowId: string;
}

const TableRowCheckbox: React.FC<TableRowCheckboxProps> = ({
  columnId,
  rowId
}) => {
  const [{ options }, tableDispatch] = useTable();

  const columnIndex: number = useTableColumnIndex({ columnId });
  const isRowSelected: boolean = useIsTableRowSelected(rowId);

  const onChange = (): void => {
    tableDispatch({ rowId, type: 'TOGGLE_ROW_ID', wasToggled: isRowSelected });
  };

  return (
    <Checkbox
      checked={isRowSelected}
      className="o-table-select"
      show={columnIndex === 0 && options.hasCheckbox}
      onChange={onChange}
    />
  );
};

export default TableRowCheckbox;
