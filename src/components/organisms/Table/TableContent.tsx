import hash from 'object-hash';
import React from 'react';

import Show from '@components/containers/Show';
import { useTableState } from '@components/organisms/Table/Table.tracked';
import TableStore from './Table.store';
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
  const { rows } = useTableState();

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
          <TableRows rows={rows} />
        </table>
      </div>

      {emptyMessage && <p className="mt-sm">{emptyMessage}</p>}
    </Show>
  );
};

export default TableContent;
