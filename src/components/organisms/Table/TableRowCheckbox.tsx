import React from 'react';

import Checkbox from '@components/atoms/Checkbox/Checkbox';
import { useTableGetColumnIndex, useTableToggleRowIds } from './Table.state';
import TableStore from './Table.store';

interface TableRowCheckboxProps {
  columnId: string;
  rowId: string;
}

const TableRowCheckbox: React.FC<TableRowCheckboxProps> = ({
  columnId,
  rowId
}) => {
  const getColumnIndex = useTableGetColumnIndex();
  const toggleRowIds = useTableToggleRowIds();

  const columnIndex: number = getColumnIndex({ columnId });

  const hasCheckbox: boolean = TableStore.useStoreState(
    ({ options }) => !!options.hasCheckbox
  );

  const isSelected: boolean = TableStore.useStoreState(({ selectedRowIds }) =>
    selectedRowIds.includes(rowId)
  );

  const onChange = (): void => {
    toggleRowIds([rowId]);
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
