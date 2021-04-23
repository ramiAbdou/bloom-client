import React from 'react';

import PanelLocal from '../Panel/PanelLocal';
import { TableProvider as TProvider } from './Table.state';
import TableStore, { tableModel } from './Table.store';
import { TableProvider } from './Table.tracked';
import {
  defaultTableOptions,
  TableInitialState,
  TableModel,
  TableOptions
} from './Table.types';
import TableBanner from './TableBanner';
import TableFilterStore from './TableFilterPanel/TableFilterPanel.store';
import TablePagination from './TablePagination/TablePagination';
import TablePaginationStore from './TablePagination/TablePagination.store';

interface TableProps extends TableInitialState {
  options?: TableOptions;
  TableActions?: React.FC;
}

const Table: React.FC<TableProps> = ({
  children,
  columns,
  options,
  rows,
  TableActions
}) => {
  const runtimeModel: TableModel = {
    ...tableModel,
    options: { ...defaultTableOptions, ...options }
  };

  return (
    <TableProvider columns={columns} rows={rows}>
      <TProvider columns={columns} rows={rows}>
        <TableStore.Provider runtimeModel={runtimeModel}>
          <TablePaginationStore.Provider>
            <TableFilterStore.Provider>
              {TableActions && <TableActions />}
              <TableBanner />
              {children}
              <TablePagination />
              <PanelLocal />
            </TableFilterStore.Provider>
          </TablePaginationStore.Provider>
        </TableStore.Provider>
      </TProvider>
    </TableProvider>
  );
};

export default Table;
