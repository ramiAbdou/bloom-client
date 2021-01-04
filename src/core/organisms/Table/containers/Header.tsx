import React from 'react';

import HeaderCell from '../components/Header/Header';
import Table from '../Table.store';
import { Column } from '../Table.types';

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
