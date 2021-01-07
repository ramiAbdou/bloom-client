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
  emptyMessage,
  showEmptyTable,
  onRenameColumn
}) => {
  const isEmpty = Table.useStoreState((store) => !store.data?.length);

  const isAllPageSelected = Table.useStoreState(
    (store) => store.isAllPageSelected
  );

  return (
    <>
      {isAllPageSelected && <TableBanner />}

      {(showEmptyTable !== false || !isEmpty) && (
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
