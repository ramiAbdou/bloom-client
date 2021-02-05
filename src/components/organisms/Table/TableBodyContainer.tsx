import React from 'react';

import Table from './Table.store';
import { TableRow } from './Table.types';
import DataRow from './TableBody/TableBody';

const BodyContainer = () => {
  const filteredRows = Table.useStoreState((store) => store.filteredRows);
  const floor = Table.useStoreState((store) => store.range[0]);
  const ceiling = Table.useStoreState((store) => store.range[1]);

  // Fetching these values forces React to re-render, which in the case of
  // sorting, we do want to re-render our data.
  Table.useStoreState((store) => store.sortColumnId);
  Table.useStoreState((store) => store.sortDirection);

  return (
    <tbody>
      {filteredRows.slice(floor, ceiling).map((row: TableRow) => (
        <DataRow key={row.id} {...row} />
      ))}
    </tbody>
  );
};

export default BodyContainer;
