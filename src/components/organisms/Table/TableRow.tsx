import React from 'react';

import { cx } from '@util/util';
import TableStore from './Table.store';
import { TableColumn, TableRow as TableRowProps } from './Table.types';
import TableRowCell from './TableCell';

const TableRow: React.FC<TableRowProps> = (row) => {
  const onRowClick = TableStore.useStoreState(({ options }) => {
    return options.onRowClick;
  });

  const columns: TableColumn[] = TableStore.useStoreState((state) => {
    return state.columns;
  });

  const isSelected: boolean = TableStore.useStoreState(({ selectedRowIds }) => {
    return selectedRowIds.includes(row?.id);
  });

  const css: string = cx('', {
    'o-table-tr--active': isSelected,
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
