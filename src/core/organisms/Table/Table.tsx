import React, { useEffect } from 'react';

import { ChildrenProps } from '@constants';
import TableStore, { tableModel } from './Table.store';
import { Column, initialTableOptions, Row, TableOptions } from './Table.types';

interface TableProps extends ChildrenProps {
  columns: Column[];
  options?: TableOptions;
  rows: Row[];
}

const UpdateAndRenderTableContent = ({
  children,
  rows
}: Pick<TableProps, 'children' | 'rows'>) => {
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
      columns: columns.map((column: Column) => ({
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
