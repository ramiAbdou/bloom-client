import React from 'react';

import { ShowProps } from '@util/constants';
import PanelLocal from '../Panel/PanelLocal';
import { TableProvider } from './Table.state';
import TableStore, { tableModel } from './Table.store';
import {
  defaultTableOptions,
  TableColumn,
  TableModel,
  TableOptions
} from './Table.types';
import TableBanner from './TableBanner';
import TableFilterStore from './TableFilterPanel/TableFilterPanel.store';
import TablePagination from './TablePagination/TablePagination';
import TablePaginationStore from './TablePagination/TablePagination.store';

interface TableProps extends ShowProps {
  columns: TableColumn[];
  options?: TableOptions;
  TableActions?: React.FC;
}

const Table: React.FC<TableProps> = ({
  children,
  columns,
  options,
  show,
  TableActions
}) => {
  if (show === false) return null;

  const runtimeModel: TableModel = {
    ...tableModel,
    columns,
    options: { ...defaultTableOptions, ...options }
  };

  return (
    <TableProvider>
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
    </TableProvider>
  );
};

export default Table;
