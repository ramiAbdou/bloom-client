import React from 'react';

import TableStore from './Table.store';
import { TableColumn } from './Table.types';
import HeaderCell from './TableHeader/TableHeader';

const TableHeaderContainer: React.FC = () => {
  const columns = TableStore.useStoreState((store) => store.columns);

  const hasData = TableStore.useStoreState(
    (store) => !!store.filteredRows.length
  );

  const customStyle = !hasData ? { borderBottom: 'none' } : {};

  return (
    <thead>
      <tr style={customStyle}>
        {columns.map((column: TableColumn, i: number) => (
          <HeaderCell key={column.id} i={i} {...column} />
        ))}
      </tr>
    </thead>
  );
};

export default TableHeaderContainer;
