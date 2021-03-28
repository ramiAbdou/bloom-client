import React from 'react';
import { IoCaretDown, IoCaretUp } from 'react-icons/io5';

import { useStoreActions, useStoreState } from '@store/Store';
import { PanelType } from '@util/constants';
import { cx } from '@util/util';
import TableStore from '../Table.store';
import { TableColumn } from '../Table.types';
import { getTableCellClass } from '../Table.util';
import TableHeaderCheckbox from './TableHeaderCheckbox';

interface TableHeaderCellProps extends TableColumn {
  i: number;
}

const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
  category,
  hideTitle,
  i,
  type,
  id,
  title
}) => {
  const alignEndRight = TableStore.useStoreState(({ columns, options }) => {
    const isLastCell = i === columns.length - 1;
    return options.alignEndRight && isLastCell;
  });

  const sortColumnId = TableStore.useStoreState((state) => state.sortColumnId);
  const direction = TableStore.useStoreState((state) => state.sortDirection);

  const hasCheckbox = TableStore.useStoreState(
    ({ options }) => options.hasCheckbox
  );

  const isSortable = TableStore.useStoreState(
    ({ options }) => options.isSortable
  );

  const fixFirstColumn = TableStore.useStoreState(
    ({ options }) => options.fixFirstColumn
  );

  const isPanelShowing = useStoreState(({ panel }) => panel.id === id);
  const showPanel = useStoreActions(({ panel }) => panel.showPanel);

  const onClick = () => {
    if (isSortable) {
      showPanel({ id: PanelType.RENAME_TABLE_COLUMN, metadata: id });
    }
  };

  const isSortedColumn = sortColumnId === id;

  const css: string = cx(getTableCellClass({ category, type }), {
    'o-table-td--right': alignEndRight,
    'o-table-th--fixed': fixFirstColumn && i === 0,
    'o-table-th--panel': isPanelShowing,
    'o-table-th--sortable': isSortable,
    'o-table-th--sorted': isSortedColumn
  });

  const showCaretUp = isSortedColumn && direction === 'ASC';
  const showCaretDown = isSortedColumn && direction === 'DESC';

  return (
    <th
      className={css}
      id={`${PanelType.RENAME_TABLE_COLUMN}-${id}`}
      onClick={onClick}
    >
      <div>
        {!i && hasCheckbox && <TableHeaderCheckbox />}
        {!hideTitle && <p>{title}</p>}
        {showCaretUp && <IoCaretUp />}
        {showCaretDown && <IoCaretDown />}
      </div>
    </th>
  );
};

export default TableHeaderCell;
