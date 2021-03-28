import React from 'react';
import { IoCaretDown, IoCaretUp } from 'react-icons/io5';

import { useStoreActions, useStoreState } from '@store/Store';
import { PanelType } from '@util/constants';
import { cx } from '@util/util';
import TableStore from './Table.store';
import { TableColumn } from './Table.types';
import { getTableCellClass } from './Table.util';
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
  const sortColumnId = TableStore.useStoreState((state) => {
    return state.sortColumnId;
  });

  const direction = TableStore.useStoreState((state) => {
    return state.sortDirection;
  });

  const hasCheckbox = TableStore.useStoreState(({ options }) => {
    return options.hasCheckbox;
  });

  const isSortable = TableStore.useStoreState(({ options }) => {
    return options.isSortable;
  });

  const isPanelShowing = useStoreState(({ panel }) => {
    return panel.id === id;
  });

  const showPanel = useStoreActions(({ panel }) => {
    return panel.showPanel;
  });

  const onClick = () => {
    if (isSortable) {
      showPanel({ id: PanelType.RENAME_TABLE_COLUMN, metadata: id });
    }
  };

  const isSortedColumn = sortColumnId === id;

  const css: string = cx(getTableCellClass({ category, type }), {
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
