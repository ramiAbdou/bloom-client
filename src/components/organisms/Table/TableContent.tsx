import React from 'react';

import Table from './Table.store';
import { OnRenameColumnProps } from './Table.types';
import TableBanner from './TableBanner/TableBanner';
import TableBodyContainer from './TableBodyContainer';
import TableHeaderContainer from './TableHeaderContainer';
import TablePagination from './TablePagination/Pagination';
import TablePanel from './TablePanel';

interface TableContent extends OnRenameColumnProps {
  emptyMessage?: string;
  showEmptyTable?: boolean;
}

const TableContentEmptyMessage: React.FC<
  Pick<TableContent, 'emptyMessage'>
> = ({ emptyMessage }) => {
  if (!emptyMessage) return null;

  return <p>{emptyMessage}</p>;
};

const TableContent: React.FC<TableContent> = ({
  emptyMessage: eMessage,
  showEmptyTable,
  onRenameColumn
}) => {
  const emptyMessage = Table.useStoreState(({ data }) => {
    if (data?.length || showEmptyTable) return null;
    return eMessage;
  });

  const isAllPageSelected = Table.useStoreState(
    (store) => store.isAllPageSelected
  );

  return (
    <>
      {isAllPageSelected && <TableBanner />}

      {!emptyMessage && (
        <div id="c-table-ctr">
          <table className="c-table">
            <TableHeaderContainer />
            <TableBodyContainer />
          </table>
        </div>
      )}

      <TablePagination />
      <TableContentEmptyMessage emptyMessage={emptyMessage} />
      <TablePanel onRenameColumn={onRenameColumn} />
    </>
  );
};

export default TableContent;
