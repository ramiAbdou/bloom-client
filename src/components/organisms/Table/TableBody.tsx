import React from 'react';

import { useTableState } from './Table.state';
import { TableRow as TableRowProps, TableState } from './Table.types';
import TableRow from './TableRow';

const TableBody: React.FC = () => {
  const { filteredRows }: TableState = useTableState();

  return (
    <tbody>
      {filteredRows.map((row: TableRowProps) => (
        <TableRow key={row.id} {...row} />
      ))}
    </tbody>
  );
};

export default TableBody;
