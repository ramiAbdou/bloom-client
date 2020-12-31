import React, { useEffect } from 'react';

import { ChildrenProps } from '@constants';
import Table, { tableModel } from './Table.store';
import {
  Column,
  initialTableOptions,
  OnRenameColumn,
  Row,
  TableOptions
} from './Table.types';

interface TableProps extends ChildrenProps {
  columns: Column[];
  options?: TableOptions;
  onRenameColumn?: OnRenameColumn;
  rows: Row[];
}

const UpdateAndRenderTableContent = ({
  children,
  rows
}: Pick<TableProps, 'children' | 'rows'>) => {
  const updateData = Table.useStoreActions((store) => store.updateData);

  // Used primarily for the removal of rows. This will not update the
  // data if the number of rows doesn't change.
  useEffect(() => {
    if (rows) updateData(rows);
  }, [rows?.length]);

  return <>{children}</>;
};

export default ({ columns, options, onRenameColumn, ...props }: TableProps) => (
  <Table.Provider
    runtimeModel={{
      ...tableModel,
      columns,
      onRenameColumn,
      options: { ...initialTableOptions, ...options }
    }}
  >
    <UpdateAndRenderTableContent {...props} />
  </Table.Provider>
);
