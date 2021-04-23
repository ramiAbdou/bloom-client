import React from 'react';

import { useTableState } from './Table.state';
import TableStore from './Table.store';
import { TableColumn } from './Table.types';
import HeaderCell from './TableHeaderCell';

const TableHeaderRow: React.FC = () => {
  const { columns } = useTableState();

  const hasData: boolean = TableStore.useStoreState(
    (state) => !!state.filteredRows.length
  );

  const customStyle: React.CSSProperties = !hasData
    ? { borderBottom: 'none' }
    : {};

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

export default TableHeaderRow;
