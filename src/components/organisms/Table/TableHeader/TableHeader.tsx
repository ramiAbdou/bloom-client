import React from 'react';
import { IoCaretDown, IoCaretUp } from 'react-icons/io5';

import { useStoreActions, useStoreState } from '@store/Store';
import { cx } from '@util/util';
import Table from '../Table.store';
import { TableColumn } from '../Table.types';
import { getTableCellClass } from '../Table.util';
import SelectAllCheckbox from './SelectAllCheckbox';

interface HeaderCellProps extends TableColumn {
  i: number;
}

const HeaderCell = ({
  category,
  hideTitle,
  i,
  type,
  id,
  title
}: HeaderCellProps) => {
  const alignEndRight = Table.useStoreState(({ columns, options }) => {
    const isLastCell = i === columns.length - 1;
    return options.alignEndRight && isLastCell;
  });

  const sortedColumnId = Table.useStoreState((store) => store.sortedColumnId);
  const direction = Table.useStoreState((store) => store.sortedColumnDirection);
  const hasCheckbox = Table.useStoreState(({ options }) => options.hasCheckbox);
  const isSortable = Table.useStoreState(({ options }) => options.isSortable);

  const fixFirstColumn = Table.useStoreState(
    ({ options }) => options.fixFirstColumn
  );

  const isPanelShowing = useStoreState(({ panel }) => panel.isIdShowing(id));
  const showPanel = useStoreActions(({ panel }) => panel.showPanel);

  const onClick = () => isSortable && showPanel(id);

  const isSortedColumn = sortedColumnId === id;

  const css = cx(getTableCellClass({ category, type }), {
    'o-table-td--right': alignEndRight,
    'o-table-th--fixed': fixFirstColumn && i === 0,
    'o-table-th--panel': isPanelShowing,
    'o-table-th--sortable': isSortable,
    'o-table-th--sorted': isSortedColumn
  });

  const showCaretUp = isSortedColumn && direction === 'ASC';
  const showCaretDown = isSortedColumn && direction === 'DESC';

  return (
    <th className={css} id={id} onClick={onClick}>
      <div>
        {!i && hasCheckbox && <SelectAllCheckbox />}
        {!hideTitle && <p>{title}</p>}
        {showCaretUp && <IoCaretUp />}
        {showCaretDown && <IoCaretDown />}
      </div>
    </th>
  );
};

export default HeaderCell;
