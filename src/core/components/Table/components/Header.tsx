/**
 * @fileoverview Component: Header
 * @author Rami Abdou
 */

import React from 'react';

import Table from '../Table.store';
import { Column } from '../Table.types';
import { HeaderSelectOption } from './SelectOption';

export default () => {
  const columns = Table.useStoreState((store) => store.columns);
  const hasData = Table.useStoreState((store) => !!store.filteredData.length);

  const customStyle = !hasData ? { borderBottom: 'none' } : {};

  return (
    <thead>
      <tr style={customStyle}>
        {columns.map(({ title }: Column, i: number) => (
          <th key={title}>
            {!i && <HeaderSelectOption />}
            {title}
          </th>
        ))}
      </tr>
    </thead>
  );
};
