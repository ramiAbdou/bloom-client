import React from 'react';

import TableStore from './Table.store';
import { TableColumn } from './Table.types';
import HeaderCell from './TableHeader/TableHeader';

const TableHeader: React.FC = () => {
  const columns = TableStore.useStoreState((state) => {
    return state.columns;
  });

  const hasData = TableStore.useStoreState((store) => {
    return !!store.filteredRows.length;
  });

  const customStyle = !hasData ? { borderBottom: 'none' } : {};

  return (
    <thead>
      <tr style={customStyle}>
        {columns.map((column: TableColumn, i: number) => {
          return <HeaderCell key={column.id} i={i} {...column} />;
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
