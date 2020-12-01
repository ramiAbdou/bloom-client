/**
 * @fileoverview Component: Header
 * @author Rami Abdou
 */

import React from 'react';

import CaretDown from '@components/Icons/CaretDown';
import CaretUp from '@components/Icons/CaretUp';
import Meta from '@components/Typography/Meta';
import CSSModifier from '@util/CSSModifier';
import Table from '../Table.store';
import { Column } from '../Table.types';
import { HeaderSelectOption } from './SelectOption';

export default () => {
  const columns = Table.useStoreState((store) => store.columns);
  const hasData = Table.useStoreState((store) => !!store.filteredData.length);
  const sortedColumnId = Table.useStoreState((store) => store.sortedColumnId);
  const direction = Table.useStoreState((store) => store.sortedColumnDirection);
  const select = Table.useStoreState((store) => store.select);
  const setSortedColumn = Table.useStoreActions(
    (actions) => actions.setSortedColumn
  );

  const customStyle = !hasData ? { borderBottom: 'none' } : {};

  return (
    <thead>
      <tr style={customStyle}>
        {columns.map(({ type, id, title }: Column, i: number) => {
          const { css } = new CSSModifier()
            .addClass(sortedColumnId === id, 'c-table-selected-col')
            .addClass(
              !type || ['SHORT_TEXT', 'CUSTOM'].includes(type),
              'c-table-cell--sm'
            )
            .addClass(
              ['MULTIPLE_CHOICE', 'MULTIPLE_SELECT'].includes(type),
              'c-table-cell--md'
            )
            .addClass(['LONG_TEXT'].includes(type), 'c-table-cell--lg');

          const showCaretUp = sortedColumnId === id && direction === 'ASC';

          return (
            <th key={title} className={css} onClick={() => setSortedColumn(id)}>
              <div>
                {!i && select && <HeaderSelectOption />}
                <Meta>{title}</Meta>
                {showCaretUp ? <CaretUp /> : <CaretDown />}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
