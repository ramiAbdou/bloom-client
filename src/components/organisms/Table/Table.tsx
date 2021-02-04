import deepequal from 'fast-deep-equal';
import React, { useEffect } from 'react';

import { ShowProps } from '@constants';
import Show from '@containers/Show';
import TableStore, { tableModel } from './Table.store';
import {
  initialTableOptions,
  TableColumn,
  TableOptions,
  TableRow
} from './Table.types';

interface TableProps extends ShowProps {
  columns: TableColumn[];
  options?: TableOptions;
  rows: TableRow[];
}

const UpdateAndRenderTableContent: React.FC<Pick<TableProps, 'rows'>> = ({
  children,
  rows
}) => {
  const data = TableStore.useStoreState((store) => store.data);
  const updateData = TableStore.useStoreActions((store) => store.updateData);

  // Used primarily for the removal of rows. This will not update the
  // data if the number of rows doesn't change.
  useEffect(() => {
    if (!deepequal(data, rows)) updateData(rows);
  }, [rows]);

  return <>{children}</>;
};

const Table: React.FC<TableProps> = ({
  columns,
  options,
  show,
  ...props
}: TableProps) => (
  <Show show={show}>
    <TableStore.Provider
      runtimeModel={{
        ...tableModel,
        columns: columns?.map((column: TableColumn) => ({
          ...column,
          id: column.id ?? column.title
        })),
        options: { ...initialTableOptions, ...options }
      }}
    >
      <UpdateAndRenderTableContent {...props} />
    </TableStore.Provider>
  </Show>
);

export default Table;
