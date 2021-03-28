import React from 'react';

import { ShowProps } from '@util/constants';
import PanelLocal from '../Panel/PanelLocal';
import TableStore, { tableModel } from './Table.store';
import {
  defaultTableOptions,
  TableColumn,
  TableModel,
  TableOptions
} from './Table.types';
import TableBanner from './TableBanner';
import TableFilterStore from './TableFilter/TableFilter.store';
import TablePagination from './TablePagination/TablePagination';
import TablePaginationStore from './TablePagination/TablePagination.store';
import TableSortStore from './TableSort/TableSort.store';

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
    <TableStore.Provider runtimeModel={runtimeModel}>
      <TablePaginationStore.Provider>
        <TableSortStore.Provider>
          <TableFilterStore.Provider>
            {TableActions && <TableActions />}
            <TableBanner />
            {children}
            <TablePagination />
            <PanelLocal />
          </TableFilterStore.Provider>
        </TableSortStore.Provider>
      </TablePaginationStore.Provider>
    </TableStore.Provider>
  );
};

export default Table;
