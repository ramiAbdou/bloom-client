import React from 'react';

import Table from './Table.store';
import { Column } from './Table.types';
import HeaderCell from './TableHeader/TableHeader';

const HeaderContainer = () => {
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

export default HeaderContainer;
