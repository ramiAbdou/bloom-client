import React from 'react';

import { QuestionType, ValueProps } from '@util/constants';
import { cx } from '@util/util';
import { getTableCellClass } from './Table.util';
import TableCellContent from './TableCellContent';
import TableRowCheckbox from './TableRowCheckbox';
import { useTableState } from '@components/organisms/Table/Table.state';
import { getColumn } from './Table.state';

interface TableCellProps extends ValueProps {
  columnId: string;
  rowId: string;
}

const TableCell: React.FC<TableCellProps> = ({ columnId, rowId, value }) => {
  const state = useTableState();
  const { category, type } = getColumn(state, { columnId });

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
