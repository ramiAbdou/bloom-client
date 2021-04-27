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
  getRange,
  useTableDispatch,
  useTableState
} from '@components/organisms/Table/Table.state';
import TableStore from './Table.store';
import { TableDispatch, TableRow, TableState } from './Table.types';
import { getBannerButtonTitle } from './Table.util';

const TableBannerButton: React.FC = () => {
  const { filteredRows }: TableState = useTableState();
  const tableDispatch: TableDispatch = useTableDispatch();

  const title: string = TableStore.useStoreState((state) =>
    getBannerButtonTitle(state)
  );

  const allRowIds: string[] = filteredRows.map((row: TableRow) => row.id);

  const onClick = () => {
    tableDispatch({ rowIds: allRowIds, type: 'TOGGLE_ROW_IDS' });
  };

  return (
    <Button tertiary onClick={onClick}>
      {title}
    </Button>
  );
};

const TableBannerMessage: React.FC = () => {
  const tableState: TableState = useTableState();
  // const { filteredRows, selectedRowIds }: TableState = tableState;

  const [floor, ceiling]: [number, number] = getRange(tableState);

  const message = '';

  // const message: string = TableStore.useStoreState((state) =>
  //   getBannerMessage({ ...state, ceiling, floor, selectedRowIds })
  // );

  return <p>{message}</p>;
};

const TableBanner: React.FC = () => {
  const tableState: TableState = useTableState();
  const { filteredRows, selectedRowIds }: TableState = tableState;

  const allRowsOnPageSelected: boolean = filteredRows.every(({ id: rowId }) =>
    selectedRowIds.includes(rowId as string)
  );

  const isAllPageSelected: boolean =
    !!selectedRowIds.length && allRowsOnPageSelected;

  return (
    <Card className="mb-xs--nlc" show={isAllPageSelected}>
      <Row justify="center" spacing="xs">
        <TableBannerMessage />
        <TableBannerButton />
      </Row>
    </Card>
  );
};

export default TableBanner;
