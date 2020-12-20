import React, { useEffect } from 'react';

import { ChildrenProps } from '@constants';
import Table, { tableModel } from './Table.store';
import { Column, OnRenameColumn, Row } from './Table.types';

interface TableProps extends ChildrenProps {
  columns: Column[];
  onRenameColumn?: OnRenameColumn;
  rows: Row[];
  select?: boolean;
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

export default ({ columns, onRenameColumn, select, ...props }: TableProps) => {
  return (
    <Table.Provider
      runtimeModel={{ ...tableModel, columns, onRenameColumn, select }}
    >
      <UpdateAndRenderTableContent {...props} />
    </Table.Provider>
  );
};
