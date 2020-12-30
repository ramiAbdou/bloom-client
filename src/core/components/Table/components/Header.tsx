import React from 'react';
import { IoCaretDown, IoCaretUp } from 'react-icons/io5';

import Checkbox from '@components/Elements/Checkbox/Checkbox';
import { useStoreActions, useStoreState } from '@store/Store';
import { makeClass } from '@util/util';
import Table from '../Table.store';
import { Column } from '../Table.types';

const SelectAllCheckbox = () => {
  const isAllPageSelected = Table.useStoreState(
    (state) => state.isAllPageSelected
  );

  const toggleAllPageRows = Table.useStoreActions(
    (store) => store.toggleAllPageRows
  );

  const onClick = () => toggleAllPageRows();

  return (
    <Checkbox
      checked={isAllPageSelected}
      className="c-table-select"
      onClick={onClick}
    />
  );
};

interface HeaderCellProps extends Column {
  i: number;
}

const HeaderCell = ({ i, type, id, title }: HeaderCellProps) => {
  const sortedColumnId = Table.useStoreState((store) => store.sortedColumnId);
  const direction = Table.useStoreState((store) => store.sortedColumnDirection);
  const select = Table.useStoreState((store) => store.select);
  const isPickerShowing = useStoreState(({ panel }) => panel.isIdShowing(id));
  const showPicker = useStoreActions(({ panel }) => panel.showPicker);

  const onClick = () => showPicker(id);

  const isSortedColumn = sortedColumnId === id;

  const css = makeClass([
    [!type || ['SHORT_TEXT', 'CUSTOM'].includes(type), 'c-table-cell--sm'],
    [['MULTIPLE_CHOICE', 'MULTIPLE_SELECT'].includes(type), 'c-table-cell--md'],
    [['LONG_TEXT'].includes(type), 'c-table-cell--lg'],
    [isPickerShowing, 'c-table-th--picker'],
    [isSortedColumn, 'c-table-th--sorted']
  ]);

  const showCaretUp = isSortedColumn && direction === 'ASC';
  const showCaretDown = isSortedColumn && direction === 'DESC';

  return (
    <th className={css} id={id} onClick={onClick}>
      <div>
        {!i && select && <SelectAllCheckbox />}
        <h4>{title}</h4>
        {showCaretUp && <IoCaretUp />}
        {showCaretDown && <IoCaretDown />}
      </div>
    </th>
  );
};

export default () => {
  const columns = Table.useStoreState((store) => store.columns);
  const hasData = Table.useStoreState((store) => !!store.filteredData.length);

  const customStyle = !hasData ? { borderBottom: 'none' } : {};

  return (
    <thead>
      <tr style={customStyle}>
        {columns.map((column: Column, i: number) => (
          <HeaderCell key={column.id} i={i} {...column} />
        ))}
      </tr>
    </thead>
  );
};
