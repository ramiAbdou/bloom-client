/**
 * @fileoverview There are a few cases that can happen with the SelectAllBanner
 * messaging including:
 * - No filter is applied, the entire page is selected.
 * - No filter is applied, the entire database is selected.
 * - Filter is applied, the entire page is selected, and there is only 1 page
 * of filtered results.
 * - Filter is applied, the entire page is selected, and there are multiple
 * pages of filtered results.
 * - Filter is applied, there are multiple pages of filtered results, and the
 * entire database is selected.
 */

import React from 'react';

import Button from '@components/atoms/Button/Button';
import Card from '@components/containers/Card/Card';
import Row from '@components/containers/Row/Row';
import {
  useTableDispatch,
  useTableState
} from '@components/organisms/Table/Table.state';
import { take } from '@util/util';
import { TableDispatch, TableRow, TableState } from './Table.types';

const TableBannerButton: React.FC = () => {
  const {
    filteredRows,
    isAllRowsSelected,
    selectedRowIds,
    totalCount
  }: TableState = useTableState();

  const tableDispatch: TableDispatch = useTableDispatch();

  const allRowIds: string[] = filteredRows.map((row: TableRow) => row.id);

  const onClick = (): void => {
    if (isAllRowsSelected) {
      tableDispatch({ type: 'TOGGLE_ALL_ROW_IDS' });
      return;
    }

    tableDispatch({ rowIds: allRowIds, type: 'TOGGLE_ROW_IDS' });
  };

  const title: string = take([
    [isAllRowsSelected, 'Clear Selection'],
    [
      filteredRows.every((filteredRow: TableRow) =>
        selectedRowIds.includes(filteredRow.id)
      ),
      `Select All ${totalCount} Rows in Database`
    ]
  ]);

  return (
    <Button tertiary onClick={onClick}>
      {title}
    </Button>
  );
};

const TableBannerMessage: React.FC = () => {
  const {
    isAllRowsSelected,
    filteredRows,
    rowsPerPage,
    selectedRowIds,
    totalCount
  }: TableState = useTableState();

  const message: string = take([
    [isAllRowsSelected, `All ${totalCount} rows are selected.`],
    [
      filteredRows.every((filteredRow: TableRow) =>
        selectedRowIds.includes(filteredRow.id)
      ),
      `All ${rowsPerPage} rows on this page are selected.`
    ]
  ]);

  return <p>{message}</p>;
};

const TableBanner: React.FC = () => {
  const tableState: TableState = useTableState();

  const {
    isAllRowsSelected,
    filteredRows,
    selectedRowIds
  }: TableState = tableState;

  if (
    !isAllRowsSelected &&
    !filteredRows.every((filteredRow: TableRow) =>
      selectedRowIds.includes(filteredRow.id)
    )
  ) {
    return null;
  }

  return (
    <Card className="mb-xs--nlc">
      <Row justify="center" spacing="xs">
        <TableBannerMessage />
        <TableBannerButton />
      </Row>
    </Card>
  );
};

export default TableBanner;
