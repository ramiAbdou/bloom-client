import React from 'react';

import Show from '@containers/Show';
import TableStore from './Table.store';
import TableBanner from './TableBanner/TableBanner';
import TableBodyContainer from './TableBodyContainer';
import TableHeaderContainer from './TableHeaderContainer';
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
  const emptyMessage = TableStore.useStoreState(({ data }) => {
    return !data?.length ? eMessage : null;
  });

  const show: boolean = TableStore.useStoreState(({ data, options }) => {
    return !options.hideIfEmpty || !!data?.length;
  });

  const isAllPageSelected: boolean = TableStore.useStoreState(
    ({ filteredData, range, selectedRowIds }) => {
      return (
        !!selectedRowIds.length &&
        filteredData
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
