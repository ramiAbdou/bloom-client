/**
 * @fileoverview Component: Header
 * @author Rami Abdou
 */

import React from 'react';

import Table from '../Table.store';
import { Column } from '../Table.types';
import { HeaderSelectOption } from './SelectOption';

const ColumnCell = ({ title }: Column) => {
  return <th>{title}</th>;
};

export default () => {
  const columns = Table.useStoreState((store) => store.columns);
  const select = Table.useStoreState((store) => store.select);

  return (
    <thead>
      <tr>
        {select && <HeaderSelectOption />}
        {columns.map((column: Column) => (
          <ColumnCell key={column.id} {...column} />
        ))}
      </tr>
    </thead>
  );
};
