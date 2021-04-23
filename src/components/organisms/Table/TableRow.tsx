import React from 'react';

import { cx } from '@util/util';
import TableStore from './Table.store';
import { useTableState } from './Table.tracked';
import {
  TableColumn,
  TableRow as TableRowProps,
  TableState
} from './Table.types';
import TableRowCell from './TableCell';

const TableRow: React.FC<TableRowProps> = (row) => {
  const { columns, selectedRowIds }: TableState = useTableState();

  const onRowClick = TableStore.useStoreState(
    ({ options }) => options.onRowClick
  );

  const isRowSelected: boolean = selectedRowIds.includes(row?.id);

  const css: string = cx('', {
    'o-table-tr--active': isRowSelected,
    'o-table-tr--clickable': !!onRowClick
  });

  const onClick = (): void => {
    if (onRowClick) onRowClick(row);
  };

  return (
    <tr className={css} onClick={onClick}>
      {columns.map((column: TableColumn) => {
        const { id: columnId } = column;

        return (
          <TableRowCell
            key={columnId + row.id}
            columnId={columnId}
            rowId={row.id}
            value={row[columnId]}
          />
        );
      })}
    </tr>
  );
};

export default TableRow;
