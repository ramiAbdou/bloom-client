import React from 'react';

import { useIsTablePopulated, useTable } from './Table.state';
import TableBody from './TableBody';
import TableHeaderRow from './TableHeaderRow';

interface TableContentProps {
  emptyMessage?: string;
}

const TableContent: React.FC<TableContentProps> = ({ emptyMessage }) => {
  const [{ options }] = useTable();
  const isTablePopulated: boolean = useIsTablePopulated();

  if (!isTablePopulated && options.hideIfEmpty) {
    return null;
  }

  return (
    <>
      <div id="o-table-ctr" style={{ maxHeight: options.small && '45vh' }}>
        <table className="o-table">
          <TableHeaderRow />
          <TableBody />
        </table>
      </div>

      {!isTablePopulated && <p className="mt-sm">{emptyMessage}</p>}
    </>
  );
};

export default TableContent;
