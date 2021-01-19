import React from 'react';
import { IoCaretDown, IoCaretUp } from 'react-icons/io5';

import { useStoreActions, useStoreState } from '@store/Store';
import { cx } from '@util/util';
import Table from '../Table.store';
import { Column } from '../Table.types';
import { getTableCellClass } from '../Table.util';
import SelectAllCheckbox from './SelectAllCheckbox';

interface HeaderCellProps extends Column {
  i: number;
}

const HeaderCell = ({
  category,
  hide,
  i,
  type,
  id,
  title
}: HeaderCellProps) => {
  const sortedColumnId = Table.useStoreState((store) => store.sortedColumnId);
  const direction = Table.useStoreState((store) => store.sortedColumnDirection);
  const hasCheckbox = Table.useStoreState(({ options }) => options.hasCheckbox);
  const isSortable = Table.useStoreState(({ options }) => options.isSortable);

  const fixFirstColumn = Table.useStoreState(
    ({ options }) => options.fixFirstColumn
  );

  const isPickerShowing = useStoreState(({ panel }) => panel.isIdShowing(id));
  const showPicker = useStoreActions(({ panel }) => panel.showPicker);

  const onClick = () => isSortable && showPicker(id);

  const isSortedColumn = sortedColumnId === id;

  const css = cx(getTableCellClass({ category, type }), {
    'c-table-th--fixed': fixFirstColumn && i === 0,
    'c-table-th--picker': isPickerShowing,
    'c-table-th--sortable': isSortable,
    'c-table-th--sorted': isSortedColumn
  });

  const showCaretUp = isSortedColumn && direction === 'ASC';
  const showCaretDown = isSortedColumn && direction === 'DESC';

  return (
    <th className={css} id={id} onClick={onClick}>
      <div>
        {!i && hasCheckbox && <SelectAllCheckbox />}
        {!hide && <p>{title}</p>}
        {showCaretUp && <IoCaretUp />}
        {showCaretDown && <IoCaretDown />}
      </div>
    </th>
  );
};

export default HeaderCell;
