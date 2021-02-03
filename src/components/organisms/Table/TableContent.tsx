import React from 'react';

import Show from '@containers/Show';
import TableStore from './Table.store';
import { OnRenameColumnProps } from './Table.types';
import TableBanner from './TableBanner/TableBanner';
import TableBodyContainer from './TableBodyContainer';
import TableHeaderContainer from './TableHeaderContainer';
import TablePagination from './TablePagination/TablePagination';
import TablePanel from './TablePanel';

interface TableContentProps extends OnRenameColumnProps {
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
  onRenameColumn,
  small
}) => {
  const emptyMessage = TableStore.useStoreState(({ data }) => {
    return !data?.length ? eMessage : null;
  });

  const show: boolean = TableStore.useStoreState(({ data, options }) => {
    return !options.hideIfEmpty || !!data?.length;
  });

  const isAllPageSelected = TableStore.useStoreState(
    (store) => store.isAllPageSelected
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
      <TablePanel onRenameColumn={onRenameColumn} />
    </Show>
  );
};

export default TableContent;
