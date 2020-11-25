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
  const setSortedColumn = Table.useStoreActions(
    (actions) => actions.setSortedColumn
  );

  const customStyle = !hasData ? { borderBottom: 'none' } : {};

  return (
    <thead>
      <tr style={customStyle}>
        {columns.map(({ id, title }: Column, i: number) => {
          const { css } = new CSSModifier().addClass(
            sortedColumnId === id,
            'c-table-selected-col'
          );

          const showCaretUp = sortedColumnId === id && direction === 'ASC';

          return (
            <th key={title} className={css} onClick={() => setSortedColumn(id)}>
              <div>
                {!i && <HeaderSelectOption />}
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
