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

import Card from '@molecules/Card/Card';
import SelectAllBannerButton from './Button';
import SelectAllBannerMessage from './Message';

const SelectAllBanner: React.FC = () => (
  <Card className="c-table-banner">
    <SelectAllBannerMessage />
    <SelectAllBannerButton />
  </Card>
);

export default SelectAllBanner;
