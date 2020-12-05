import React from 'react';
import { IoCaretDown, IoCaretUp } from 'react-icons/io5';

import { useStoreActions, useStoreState } from '@store/Store';
import { makeClass } from '@util/util';
import Table, { Column } from '../Table.store';
import { HeaderSelectOption } from './SelectOption';

const HeaderCell = ({ type, id, title }: Column) => {
  const sortedColumnId = Table.useStoreState((store) => store.sortedColumnId);
  const direction = Table.useStoreState((store) => store.sortedColumnDirection);
  const select = Table.useStoreState((store) => store.select);
  const isIdShowing = useStoreState(({ picker }) => picker.isIdShowing(id));
  const showPicker = useStoreActions(({ picker }) => picker.showPicker);

  const css = makeClass([
    [sortedColumnId === id, 'c-table-selected-col'],
    [!type || ['SHORT_TEXT', 'CUSTOM'].includes(type), 'c-table-cell--sm'],
    [['MULTIPLE_CHOICE', 'MULTIPLE_SELECT'].includes(type), 'c-table-cell--md'],
    [['LONG_TEXT'].includes(type), 'c-table-cell--lg'],
    [isIdShowing, 'c-table-col--picker']
  ]);

  const showCaretUp = sortedColumnId === id && direction === 'ASC';

  return (
    <th key={title} className={css} id={id} onClick={() => showPicker(id)}>
      <div>
        {select && <HeaderSelectOption />}
        <p className="meta">{title}</p>
        {showCaretUp ? <IoCaretUp /> : <IoCaretDown />}
      </div>
    </th>
  );
};

export default () => {
  const columns = Table.useStoreState((store) => store.columns);
  const hasData = Table.useStoreState((store) => !!store.filteredData.length);
  const canRename = Table.useStoreState((store) => store.canRename);

  const customStyle = !hasData ? { borderBottom: 'none' } : {};

  const css = makeClass([canRename, 'c-table--rename']);

  return (
    <thead>
      <tr className={css} style={customStyle}>
        {columns.map((column: Column) => (
          <HeaderCell key={column.id} {...column} />
        ))}
      </tr>
    </thead>
  );
};
