import React from 'react';

import { ShowProps } from '@util/constants';
import PanelLocal from '../Panel/PanelLocal';
import TableStore, { tableModel } from './Table.store';
import { defaultTableOptions, TableColumn, TableOptions } from './Table.types';
import TableFilterStore from './TableFilter/TableFilter.store';

interface TableProps extends ShowProps {
  columns: TableColumn[];
  options?: TableOptions;
}

const Table: React.FC<TableProps> = ({ children, columns, options, show }) => {
  if (show === false) return null;

  return (
    <TableStore.Provider
      runtimeModel={{
        ...tableModel,
        columns: columns?.map((column: TableColumn) => {
          return {
            ...column,
            id: column.id ?? column.title
          };
        }),
        options: { ...defaultTableOptions, ...options }
      }}
    >
      <TableFilterStore.Provider>
        {children}
        <PanelLocal />
      </TableFilterStore.Provider>
    </TableStore.Provider>
  );
};

export default Table;
