import hash from 'object-hash';
import React from 'react';

import TableStore from './Table.store';
import { TableRow as TableRowProps } from './Table.types';
import TableRow from './TableRow/TableRow';

const TableBody: React.FC = () => {
  const filteredRows = TableStore.useStoreState((state) => state.filteredRows);
  const floor = TableStore.useStoreState((state) => state.range[0]);
  const ceiling = TableStore.useStoreState((state) => state.range[1]);

  // Fetching these values forces React to re-render, which in the case of
  // sorting, we do want to re-render our data.
  TableStore.useStoreState((state) => state.sortColumnId);
  TableStore.useStoreState((state) => state.sortDirection);

  return (
    <tbody>
      {filteredRows.slice(floor, ceiling).map((row: TableRowProps) => (
        <TableRow key={hash(row)} {...row} />
      ))}
    </tbody>
  );
};

export default TableBody;
