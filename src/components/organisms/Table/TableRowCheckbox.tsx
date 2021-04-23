import React from 'react';

import Checkbox from '@components/atoms/Checkbox/Checkbox';
import { useTableGetColumnIndex } from './Table.state';
import TableStore from './Table.store';
import { useTableDispatch } from './Table.tracked';

interface TableRowCheckboxProps {
  columnId: string;
  rowId: string;
}

const TableRowCheckbox: React.FC<TableRowCheckboxProps> = ({
  columnId,
  rowId
}) => {
  const tableDispatch = useTableDispatch();
  const getColumnIndex = useTableGetColumnIndex();

  const columnIndex: number = getColumnIndex({ columnId });

  const hasCheckbox: boolean = TableStore.useStoreState(
    ({ options }) => !!options.hasCheckbox
  );

  const isSelected: boolean = TableStore.useStoreState(({ selectedRowIds }) =>
    selectedRowIds.includes(rowId)
  );

  const onChange = (): void => {
    tableDispatch({ rowIds: [rowId], type: 'TOGGLE_ROW_IDS' });
  };

  return (
    <Checkbox
      checked={isSelected}
      className="o-table-select"
      show={columnIndex === 0 && hasCheckbox}
      onChange={onChange}
    />
  );
};

export default TableRowCheckbox;
