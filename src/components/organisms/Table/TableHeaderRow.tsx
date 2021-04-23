import React from 'react';

import { useTableState } from './Table.state';
import { TableColumn, TableState } from './Table.types';
import HeaderCell from './TableHeaderCell';

const TableHeaderRow: React.FC = () => {
  const { columns, filteredRows }: TableState = useTableState();

  const customStyle: React.CSSProperties = !filteredRows.length
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
