import React from 'react';

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
  if (!emptyMessage) return null;

  return <p>{emptyMessage}</p>;
};

const TableContent: React.FC<TableContentProps> = ({
  emptyMessage: eMessage,
  onRenameColumn,
  small
}) => {
  const emptyMessage = TableStore.useStoreState(({ data }) => {
    if (data?.length) return null;
    return eMessage;
  });

  const show: boolean = TableStore.useStoreState(({ data, options }) => {
    return !options.hideIfEmpty || !!data?.length;
  });

  const isAllPageSelected = TableStore.useStoreState(
    (store) => store.isAllPageSelected
  );

  if (show === false) return null;

  return (
    <>
      {isAllPageSelected && <TableBanner />}

      {!emptyMessage && (
        <div id="c-table-ctr" style={{ maxHeight: small && '45vh' }}>
          <table className="c-table">
            <TableHeaderContainer />
            <TableBodyContainer />
          </table>
        </div>
      )}

      {!emptyMessage && <TablePagination />}
      <TableContentEmptyMessage emptyMessage={emptyMessage} />
      <TablePanel onRenameColumn={onRenameColumn} />
    </>
  );
};

export default TableContent;
