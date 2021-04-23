import React, { useEffect } from 'react';

import PanelLocal from '../Panel/PanelLocal';
import { TableProvider, useTableDispatch } from './Table.state';
import TableStore from './Table.store';
import { TableDispatch, TableInitialState } from './Table.types';
import TableBanner from './TableBanner';
import TableFilterStore from './TableFilterPanel/TableFilterPanel.store';
import TablePagination from './TablePagination/TablePagination';

interface TableProps extends TableInitialState {
  TableActions?: React.FC;
}

const TableContent: React.FC<Partial<TableProps>> = ({
  children,
  rows,
  TableActions
}) => {
  const tableDispatch: TableDispatch = useTableDispatch();

  useEffect(() => {
    tableDispatch({ rows, type: 'SET_ROWS' });
  }, [rows]);

  return (
    <>
      {TableActions && <TableActions />}
      <TableBanner />
      {children}
      <TablePagination />
      <PanelLocal />
    </>
  );
};

const Table: React.FC<TableProps> = ({
  children,
  columns,
  options,
  rows,
  TableActions
}) => (
  <TableProvider columns={columns} options={options} rows={rows}>
    <TableStore.Provider>
      <TableFilterStore.Provider>
        <TableContent TableActions={TableActions} rows={rows}>
          {children}
        </TableContent>
      </TableFilterStore.Provider>
    </TableStore.Provider>
  </TableProvider>
);

export default Table;
