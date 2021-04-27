import hash from 'object-hash';
import React from 'react';

import { useTableState } from './Table.state';
import { TableRow as TableRowProps } from './Table.types';
import TableHeaderRow from './TableHeaderRow';
import TableRow from './TableRow';

interface TableContentProps {
  emptyMessage?: string;
}

const TableBody: React.FC = () => {
  const { filteredRows } = useTableState();

  return (
    <tbody>
      {filteredRows.map((row: TableRowProps) => (
        <TableRow key={hash(row)} {...row} />
      ))}
    </tbody>
  );
};

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
