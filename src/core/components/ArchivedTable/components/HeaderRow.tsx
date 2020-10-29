/**
 * @fileoverview Component: HeaderRow
 * @author Rami Abdou
 */

import React from 'react';
import { HeaderGroup } from 'react-table';

import CSSModifier from '@util/CSSModifier';

const HeaderColumn = (column: HeaderGroup) => {
  const { css } = new CSSModifier().addClass(
    column.id === 'SELECTOR',
    'c-table-selector'
  );

  return (
    <th className={css} {...column.getHeaderProps()}>
      {column.render('Header')}
    </th>
  );
};

export default (headerGroup: HeaderGroup) => (
  <tr>
    {headerGroup.headers.map((column) => (
      <HeaderColumn key={column.id} {...column} />
    ))}
  </tr>
);
