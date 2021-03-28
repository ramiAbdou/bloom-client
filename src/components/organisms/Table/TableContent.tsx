import hash from 'object-hash';
import React from 'react';

import Show from '@containers/Show';
import TableStore from './Table.store';
import { TableRow as TableRowProps } from './Table.types';
import TableBanner from './TableBanner';
import TableHeaderRow from './TableHeaderRow';
import TablePagination from './TablePagination/TablePagination';
import TablePaginationStore from './TablePagination/TablePagination.store';
import TableRow from './TableRow';
import useUpdateTableRows from './useUpdateTableRows';

interface TableContentProps {
  emptyMessage?: string;
  small?: boolean;
  rows?: TableRowProps[];
}

const TableContentEmptyMessage: React.FC<
  Pick<TableContentProps, 'emptyMessage'>
> = ({ emptyMessage }) => {
  return (
    <Show show={!!emptyMessage}>
      <p>{emptyMessage}</p>
    </Show>
  );
};

const TableBody: React.FC = () => {
  const floor: number = TablePaginationStore.useStoreState((state) => {
    return state.floor;
  });

  const ceiling: number = TablePaginationStore.useStoreState((state) => {
    return state.ceiling;
  });

  const filteredRowsOnPage: TableRowProps = TableStore.useStoreState(
    (state) => {
      return state.filteredRows.slice(floor, ceiling);
    }
  );

  // Fetching these values forces React to re-render, which in the case of
  // sorting, we do want to re-render our data.
  TableStore.useStoreState((state) => {
    return state.sortColumnId;
  });

  TableStore.useStoreState((state) => {
    return state.sortDirection;
  });

  return (
    <tbody>
      {filteredRowsOnPage.map((row: TableRowProps) => {
        return <TableRow key={hash(row)} {...row} />;
      })}
    </tbody>
  );
};

const TableContent: React.FC<TableContentProps> = ({
  emptyMessage: eMessage,
  small,
  rows
}) => {
  useUpdateTableRows(rows);

  const emptyMessage: string = TableStore.useStoreState((state) => {
    return !state.rows?.length ? eMessage : null;
  });

  const show: boolean = TableStore.useStoreState((state) => {
    return !!state.rows?.length || !state.options.hideIfEmpty;
  });

  return (
    <Show show={show}>
      <TableBanner />

      <Show show={!emptyMessage}>
        <div id="o-table-ctr" style={{ maxHeight: small && '45vh' }}>
          <table className="o-table">
            <TableHeaderRow />
            <TableBody />
          </table>
        </div>
      </Show>

      {!emptyMessage && <TablePagination />}
      <TableContentEmptyMessage emptyMessage={emptyMessage} />
    </Show>
  );
};

export default TableContent;
