import hash from 'object-hash';
import React from 'react';

import Show from '@containers/Show';
import TableStore from './Table.store';
import { TableRow as TableRowProps } from './Table.types';
import TableBanner from './TableBanner';
import TableHeaderRow from './TableHeaderRow/TableHeaderRow';
import TablePagination from './TablePagination/TablePagination';
import TableRow from './TableRow/TableRow';

interface TableContentProps {
  emptyMessage?: string;
  small?: boolean;
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
  const filteredRows: TableRowProps = TableStore.useStoreState((state) => {
    return state.filteredRows;
  });

  const floor: number = TableStore.useStoreState((state) => {
    return state.range[0];
  });

  const ceiling: number = TableStore.useStoreState((state) => {
    return state.range[1];
  });

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
      {filteredRows.slice(floor, ceiling).map((row: TableRowProps) => {
        return <TableRow key={hash(row)} {...row} />;
      })}
    </tbody>
  );
};

const TableContent: React.FC<TableContentProps> = ({
  emptyMessage: eMessage,
  small
}) => {
  const emptyMessage = TableStore.useStoreState(({ rows }) => {
    return !rows?.length ? eMessage : null;
  });

  const show: boolean = TableStore.useStoreState(({ rows, options }) => {
    return !options.hideIfEmpty || !!rows?.length;
  });

  const isAllPageSelected: boolean = TableStore.useStoreState(
    ({ filteredRows, range, selectedRowIds }) => {
      return (
        !!selectedRowIds.length &&
        filteredRows.slice(range[0], range[1]).every(({ id: rowId }) => {
          return selectedRowIds.includes(rowId as string);
        })
      );
    }
  );

  return (
    <Show show={show}>
      {isAllPageSelected && <TableBanner />}

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
