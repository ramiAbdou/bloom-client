import hash from 'object-hash';
import React from 'react';

import { useTableState } from './Table.state';
import { TableRow as TableRowProps } from './Table.types';
import TableHeaderRow from './TableHeaderRow';
import TableRow from './TableRow';

interface TableContentProps {
  emptyMessage?: string;
}

interface TableRowsProps {
  rows: TableRowProps[];
}

const TableRows: React.FC<TableRowsProps> = ({ rows }) => (
  <tbody>
    {rows.map((row: TableRowProps) => (
      <TableRow key={hash(row)} {...row} />
    ))}
  </tbody>
);

const TableContent: React.FC<TableContentProps> = ({
  emptyMessage: eMessage
}) => {
  const { options, rows } = useTableState();

  if (!rows?.length && options.hideIfEmpty) {
    return null;
  }

  const emptyMessage: string = !rows?.length ? eMessage : null;

  return (
    <>
      <div id="o-table-ctr" style={{ maxHeight: options.small && '45vh' }}>
        <table className="o-table">
          <TableHeaderRow />
          <TableRows rows={rows} />
        </table>
      </div>

      {emptyMessage && <p className="mt-sm">{emptyMessage}</p>}
    </>
  );
};

export default TableContent;
