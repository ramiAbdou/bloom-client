import React from 'react';

import Checkbox from '@atoms/Checkbox/Checkbox';
import TableStore from './Table.store';
import { TableColumn } from './Table.types';

interface TableRowCheckboxProps {
  columnId: string;
  rowId: string;
}

const TableRowCheckbox: React.FC<TableRowCheckboxProps> = ({
  columnId,
  rowId
}) => {
  const columnIndex: number = TableStore.useStoreState(({ columns }) =>
    columns.findIndex((element: TableColumn) => element.id === columnId)
  );

  const hasCheckbox: boolean = TableStore.useStoreState(
    ({ options }) => !!options.hasCheckbox
  );

  const isSelected: boolean = TableStore.useStoreState(({ selectedRowIds }) =>
    selectedRowIds.includes(rowId)
  );

  const toggleRow = TableStore.useStoreActions((state) => state.toggleRow);

  const onChange = (): void => {
    toggleRow(rowId);
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
