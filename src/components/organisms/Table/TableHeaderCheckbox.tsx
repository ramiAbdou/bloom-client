import React from 'react';

import Checkbox from '@atoms/Checkbox/Checkbox';
import TableStore from './Table.store';
import { TableRow } from './Table.types';
import TablePaginationStore from './TablePagination/TablePagination.store';

const TableHeaderCheckbox: React.FC = () => {
  const floor: number = TablePaginationStore.useStoreState((state) => {
    return state.floor;
  });

  const ceiling: number = TablePaginationStore.useStoreState((state) => {
    return state.ceiling;
  });

  const currentPageRowIds: string[] = TableStore.useStoreState((state) => {
    return state.filteredRows.slice(floor, ceiling).map((row: TableRow) => {
      return row.id;
    });
  });

  const isAllPageSelected: boolean = TableStore.useStoreState(
    ({ selectedRowIds }) => {
      return (
        !!selectedRowIds.length &&
        currentPageRowIds.every((rowId: string) => {
          return selectedRowIds.includes(rowId);
        })
      );
    }
  );

  const toggleRows = TableStore.useStoreActions((store) => {
    return store.toggleRows;
  });

  const onChange = () => {
    toggleRows(currentPageRowIds);
  };

  return (
    <Checkbox
      checked={isAllPageSelected}
      className="o-table-select"
      onChange={onChange}
    />
  );
};

export default TableHeaderCheckbox;
