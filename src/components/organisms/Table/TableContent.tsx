import React from 'react';

import Show from '@containers/Show';
import TableStore from './Table.store';
import TableBanner from './TableBanner';
import TableBodyContainer from './TableBody';
import TableHeaderContainer from './TableHeader';
import TablePagination from './TablePagination/TablePagination';
import TablePanel from './TablePanel';

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
        filteredRows
          .slice(range[0], range[1])
          .every(({ id: rowId }) => selectedRowIds.includes(rowId))
      );
    }
  );

  return (
    <Show show={show}>
      {isAllPageSelected && <TableBanner />}

      <Show show={!emptyMessage}>
        <div id="o-table-ctr" style={{ maxHeight: small && '45vh' }}>
          <table className="o-table">
            <TableHeaderContainer />
            <TableBodyContainer />
          </table>
        </div>
      </Show>

      {!emptyMessage && <TablePagination />}
      <TableContentEmptyMessage emptyMessage={emptyMessage} />
      <TablePanel />
    </Show>
  );
};

export default TableContent;
