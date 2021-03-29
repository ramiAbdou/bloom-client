import React from 'react';

import { QuestionCategory, QuestionType, ValueProps } from '@util/constants';
import { cx } from '@util/util';
import TableStore from './Table.store';
import { TableColumn } from './Table.types';
import { getTableCellClass } from './Table.util';
import TableCellContent from './TableCellContent';
import TableRowCheckbox from './TableRowCheckbox';

interface TableCellProps extends ValueProps {
  columnId: string;
  rowId: string;
}

const TableCell: React.FC<TableCellProps> = ({ columnId, rowId, value }) => {
  const columnIndex: number = TableStore.useStoreState(({ columns }) =>
    columns.findIndex((column: TableColumn) => column.id === columnId)
  );

  const category: QuestionCategory = TableStore.useStoreState(({ columns }) => {
    const column: TableColumn = columns[columnIndex];
    return column?.category;
  });

  const type: QuestionType = TableStore.useStoreState(({ columns }) => {
    const column: TableColumn = columns[columnIndex];
    return column?.type;
  });

  const css: string = cx(getTableCellClass({ category, type }), {
    'o-table-td--multiple-select': type === QuestionType.MULTIPLE_SELECT
  });

  return (
    <td className={css}>
      <div>
        <TableRowCheckbox columnId={columnId} rowId={rowId} />
        <TableCellContent columnId={columnId} value={value} />
      </div>
    </td>
  );
};

export default TableCell;
