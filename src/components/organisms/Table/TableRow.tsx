import React from 'react';

import { cx } from '@util/util';
import { useIsTableRowSelected, useTableState } from './Table.state';
import {
  TableColumn,
  TableRow as TableRowProps,
  TableState
} from './Table.types';
import TableRowCell from './TableCell';

const TableRow: React.FC<TableRowProps> = (row) => {
  const { columns, options }: TableState = useTableState();
  const isRowSelected: boolean = useIsTableRowSelected(row.id);

  const css: string = cx('', {
    'o-table-tr--active': isRowSelected,
    'o-table-tr--clickable': !!options.onRowClick
  });

  const onClick = (): void => {
    if (options.onRowClick) options.onRowClick(row);
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

export default React.memo(TableRow);
