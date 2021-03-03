import deepequal from 'fast-deep-equal';
import React, { useEffect } from 'react';

import { ShowProps } from '@util/constants';
import PanelLocal from '../Panel/PanelLocal';
import TableStore, { tableModel } from './Table.store';
import {
  defaultTableOptions,
  TableColumn,
  TableOptions,
  TableRow
} from './Table.types';
import TableFilterStore from './TableFilter/TableFilter.store';

interface TableProps extends ShowProps {
  columns: TableColumn[];
  options?: TableOptions;
  rows: TableRow[];
}

const TableUpdateRows: React.FC<Pick<TableProps, 'rows'>> = ({
  children,
  rows
}) => {
  const storedRows = TableStore.useStoreState((store) => store.rows);
  const setRows = TableStore.useStoreActions((store) => store.setRows);

  // // Used primarily for the removal of rows. This will not update the
  // // data if the number of rows doesn't change.
  useEffect(() => {
    if (!deepequal(storedRows, rows)) setRows(rows ?? []);
  }, [rows]);

  return <>{children}</>;
};

const Table: React.FC<TableProps> = ({
  children,
  columns,
  options,
  rows,
  show
}) => {
  if (show === false) return null;

  return (
    <TableStore.Provider
      runtimeModel={{
        ...tableModel,
        columns: columns?.map((column: TableColumn) => ({
          ...column,
          id: column.id ?? column.title
        })),
        options: { ...defaultTableOptions, ...options }
      }}
    >
      <TableFilterStore.Provider>
        <TableUpdateRows rows={rows}>{children}</TableUpdateRows>
        <PanelLocal />
      </TableFilterStore.Provider>
    </TableStore.Provider>
  );
};

export default Table;
