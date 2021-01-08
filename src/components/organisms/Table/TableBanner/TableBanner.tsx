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

import Card from '@containers/Card/Card';
import TableBannerButton from './Button';
import TableBannerMessage from './TableBannerMessage';

const TableBanner: React.FC = () => (
  <Card className="c-table-banner">
    <TableBannerMessage />
    <TableBannerButton />
  </Card>
);

export default TableBanner;
