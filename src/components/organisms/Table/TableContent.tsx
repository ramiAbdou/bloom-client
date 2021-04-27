import React from 'react';

import { useTableState } from './Table.state';
import TableBody from './TableBody';
import TableHeaderRow from './TableHeaderRow';

interface TableContentProps {
  emptyMessage?: string;
}

const TableContent: React.FC<TableContentProps> = ({
  emptyMessage: eMessage
}) => {
  const { filteredRows, options } = useTableState();

  if (!filteredRows?.length && options.hideIfEmpty) {
    return null;
  }

  const emptyMessage: string = !filteredRows?.length ? eMessage : null;

  return (
    <>
      <div id="o-table-ctr" style={{ maxHeight: options.small && '45vh' }}>
        <table className="o-table">
          <TableHeaderRow />
          <TableBody />
        </table>
      </div>

      {emptyMessage && <p className="mt-sm">{emptyMessage}</p>}
    </>
  );
};

export default TableContent;
