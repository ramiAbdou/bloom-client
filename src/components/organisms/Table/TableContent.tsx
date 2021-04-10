import hash from 'object-hash';
import React from 'react';

import Show from '@components/containers/Show';
import { sortObjects } from '@util/util';
import TableStore from './Table.store';
import { TableRow as TableRowProps } from './Table.types';
import TableHeaderRow from './TableHeaderRow';
import TablePaginationStore from './TablePagination/TablePagination.store';
import TableRow from './TableRow';
import TableSortStore from './TableSort/TableSort.store';
import { TableSortDirection } from './TableSort/TableSort.types';
import useUpdateTableRows from './useUpdateTableRows';

interface TableContentProps {
  emptyMessage?: string;
  small?: boolean;
  rows?: TableRowProps[];
}

const TableBody: React.FC = () => {
  const floor: number = TablePaginationStore.useStoreState(
    (state) => state.floor
  );

  const ceiling: number = TablePaginationStore.useStoreState(
    (state) => state.ceiling
  );

  // Fetching these values forces React to re-render, which in the case of
  // sorting, we do want to re-render our data.
  const sortColumnId: string = TableSortStore.useStoreState(
    (state) => state.sortColumnId
  );

  const sortDirection: TableSortDirection = TableSortStore.useStoreState(
    (state) => state.sortDirection
  );

  const filteredRowsOnPage: TableRowProps = TableStore.useStoreState(
    (state) => {
      const sortedRows: TableRowProps[] = [
        ...state.filteredRows
      ].sort((a: TableRowProps, b: TableRowProps) =>
        sortObjects(a, b, sortColumnId, sortDirection)
      );

      return sortedRows.slice(floor, ceiling);
    }
  );

  return (
    <tbody>
      {filteredRowsOnPage.map((row: TableRowProps) => (
        <TableRow key={hash(row)} {...row} />
      ))}
    </tbody>
  );
};

const TableContent: React.FC<TableContentProps> = ({
  emptyMessage: eMessage,
  small,
  rows
}) => {
  useUpdateTableRows(rows);

  const emptyMessage: string = TableStore.useStoreState((state) =>
    !state.rows?.length ? eMessage : null
  );

  const show: boolean = TableStore.useStoreState(
    (state) => !!state.rows?.length || !state.options.hideIfEmpty
  );

  return (
    <Show show={show}>
      <div id="o-table-ctr" style={{ maxHeight: small && '45vh' }}>
        <table className="o-table">
          <TableHeaderRow />
          <TableBody />
        </table>
      </div>

      {emptyMessage && <p className="mt-sm">{emptyMessage}</p>}
    </Show>
  );
};

export default TableContent;
