import hash from 'object-hash';
import React from 'react';

import TableStore from './Table.store';
import { TableRow as TableRowProps } from './Table.types';
import TableRow from './TableRow/TableRow';

const TableBody: React.FC = () => {
  const filteredRows = TableStore.useStoreState((state) => {
    return state.filteredRows;
  });

  const floor = TableStore.useStoreState((state) => {
    return state.range[0];
  });

  const ceiling = TableStore.useStoreState((state) => {
    return state.range[1];
  });

  // Fetching these values forces React to re-render, which in the case of
  // sorting, we do want to re-render our data.
  TableStore.useStoreState((state) => {
    return state.sortColumnId;
  });

  TableStore.useStoreState((state) => {
    return state.sortDirection;
  });

  return (
    <tbody>
      {filteredRows.slice(floor, ceiling).map((row: TableRowProps) => {
        return <TableRow key={hash(row)} {...row} />;
      })}
    </tbody>
  );
};

export default TableBody;
