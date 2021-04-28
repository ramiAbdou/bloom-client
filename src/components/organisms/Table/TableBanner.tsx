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

import Card from '@components/containers/Card/Card';
import Row from '@components/containers/Row/Row';
import {
  useTable,
  useTableSelector
} from '@components/organisms/Table/Table.state';
import { TableRow, TableState } from './Table.types';
import TableBannerButton from './TableBannerButton';
import TableBannerMessage from './TableBannerMessage';

const TableBanner: React.FC = () => {
  const [{ isAllRowsSelected }] = useTable();

  const isAllRowsOnPageSelected: boolean = useTableSelector(
    ({ filteredRows, selectedRowIds }: TableState) =>
      !!selectedRowIds.length &&
      filteredRows.every((filteredRow: TableRow) =>
        selectedRowIds.includes(filteredRow.id)
      )
  );

  if (!isAllRowsSelected && !isAllRowsOnPageSelected) {
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
