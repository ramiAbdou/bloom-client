/**
 * @fileoverview Component: DisplayingText

 */

import React from 'react';

import Meta from '@components/Typography/Meta';
import Table from '../../Table.store';

export default () => {
  const floor = Table.useStoreState((store) => store.range[0] + 1);
  const numData = Table.useStoreState((store) => store.filteredData.length);
  const ceiling = numData - floor >= 99 ? floor + 99 : numData;

  const message = numData
    ? `Displaying ${floor}-${ceiling} of ${numData} results.`
    : 'No results found.';

  return <Meta>{message}</Meta>;
};
