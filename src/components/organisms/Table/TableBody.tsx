import React from 'react';

import TableStore from './Table.store';
import { TableRow as TableRowProps } from './Table.types';
import TableRow from './TableRow/TableRow';

const TableBody: React.FC = () => {
  const filteredRows = TableStore.useStoreState((store) => store.filteredRows);
  const floor = TableStore.useStoreState((store) => store.range[0]);
  const ceiling = TableStore.useStoreState((store) => store.range[1]);

  // Fetching these values forces React to re-render, which in the case of
  // sorting, we do want to re-render our data.
  TableStore.useStoreState((store) => store.sortColumnId);
  TableStore.useStoreState((store) => store.sortDirection);

  return (
    <tbody>
      {filteredRows.slice(floor, ceiling).map((row: TableRowProps) => (
        <TableRow key={row.id} {...row} />
      ))}
    </tbody>
  );
};

export default TableBody;
