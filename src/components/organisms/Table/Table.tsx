import React, { useEffect } from 'react';

import TableStore, { tableModel } from './Table.store';
import {
  initialTableOptions,
  TableColumn,
  TableOptions,
  TableRow
} from './Table.types';

interface TableProps {
  columns: TableColumn[];
  options?: TableOptions;
  rows: TableRow[];
}

const UpdateAndRenderTableContent: React.FC<Pick<TableProps, 'rows'>> = ({
  children,
  rows
}) => {
  const updateData = TableStore.useStoreActions((store) => store.updateData);

  // Used primarily for the removal of rows. This will not update the
  // data if the number of rows doesn't change.
  useEffect(() => {
    if (rows) updateData(rows);
  }, [rows?.length]);

  return <>{children}</>;
};

const Table: React.FC<TableProps> = ({
  columns,
  options,
  ...props
}: TableProps) => (
  <TableStore.Provider
    runtimeModel={{
      ...tableModel,
      columns: columns.map((column: TableColumn) => ({
        ...column,
        id: column.id ?? column.title
      })),
      options: { ...initialTableOptions, ...options }
    }}
  >
    <UpdateAndRenderTableContent {...props} />
  </TableStore.Provider>
);

export default Table;
