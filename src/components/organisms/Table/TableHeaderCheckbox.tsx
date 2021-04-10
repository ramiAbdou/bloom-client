import React from 'react';

import Checkbox from '@components/atoms/Checkbox/Checkbox';
import TableStore from './Table.store';
import { TableRow } from './Table.types';
import TablePaginationStore from './TablePagination/TablePagination.store';

const TableHeaderCheckbox: React.FC = () => {
  const floor: number = TablePaginationStore.useStoreState(
    (state) => state.floor
  );

  const ceiling: number = TablePaginationStore.useStoreState(
    (state) => state.ceiling
  );

  const currentPageRowIds: string[] = TableStore.useStoreState((state) => {
    const rowsOnPage: TableRow[] = state.filteredRows.slice(floor, ceiling);
    return rowsOnPage.map((row: TableRow) => row.id);
  });

  const isAllPageSelected: boolean = TableStore.useStoreState(
    ({ selectedRowIds }) => {
      const allRowsOnPageSelected: boolean = currentPageRowIds.every(
        (rowId: string) => selectedRowIds.includes(rowId)
      );

      return !!selectedRowIds.length && allRowsOnPageSelected;
    }
  );

  const toggleRows = TableStore.useStoreActions((state) => state.toggleRows);

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
