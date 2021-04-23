import hash from 'object-hash';
import React from 'react';

import { useTableState } from './Table.state';
import { TableRow as TableRowProps } from './Table.types';
import TableHeaderRow from './TableHeaderRow';
import TablePaginationStore from './TablePagination/TablePagination.store';
import TableRow from './TableRow';

interface TableContentProps {
  emptyMessage?: string;
  small?: boolean;
  rows?: TableRowProps[];
}

interface TableRowsProps {
  rows: TableRowProps[];
}

const TableRows: React.FC<TableRowsProps> = ({ rows }) => {
  const floor: number = TablePaginationStore.useStoreState(
    (state) => state.floor
  );

  const ceiling: number = TablePaginationStore.useStoreState(
    (state) => state.ceiling
  );

  const rowsOnPage: TableRowProps[] = [...rows].slice(floor, ceiling);

  return (
    <tbody>
      {rowsOnPage.map((row: TableRowProps) => (
        <TableRow key={hash(row)} {...row} />
      ))}
    </tbody>
  );
};

const TableContent: React.FC<TableContentProps> = ({
  emptyMessage: eMessage,
  small
}) => {
  const { options, rows } = useTableState();

  if (!rows?.length && options.hideIfEmpty) {
    return null;
  }

  const emptyMessage: string = !rows?.length ? eMessage : null;

  return (
    <>
      <div id="o-table-ctr" style={{ maxHeight: small && '45vh' }}>
        <table className="o-table">
          <TableHeaderRow />
          <TableRows rows={rows} />
        </table>
      </div>

      {emptyMessage && <p className="mt-sm">{emptyMessage}</p>}
    </>
  );
};

export default TableContent;
