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

import Button from '@atoms/Button/Button';
import Card from '@containers/Card/Card';
import Row from '@containers/Row/Row';
import TableStore from './Table.store';
import { getBannerButtonTitle, getBannerMessage } from './Table.util';

const TableBannerButton: React.FC = () => {
  const title: string = TableStore.useStoreState((state) => {
    return getBannerButtonTitle(state);
  });

  const toggleRows = TableStore.useStoreActions((store) => store.toggleAllRows);
  const onClick = () => toggleRows();

  return (
    <Button tertiary onClick={onClick}>
      {title}
    </Button>
  );
};

const TableBannerMessage: React.FC = () => {
  const message: string = TableStore.useStoreState((state) => {
    return getBannerMessage(state);
  });

  return <p>{message}</p>;
};

const TableBanner: React.FC = () => (
  <Card className="mb-xs--nlc">
    <Row justify="center" spacing="xs">
      <TableBannerMessage />
      <TableBannerButton />
    </Row>
  </Card>
);

export default TableBanner;
