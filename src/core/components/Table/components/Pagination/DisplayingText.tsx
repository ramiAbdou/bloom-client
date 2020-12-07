import React from 'react';

import Table from '../../Table.store';

export default () => {
  const floor = Table.useStoreState(({ range }) => range[0] + 1);
  const ceiling = Table.useStoreState(({ range }) => range[1]);
  const numRows = Table.useStoreState((store) => store.filteredData.length);

  const message = numRows
    ? `Displaying ${floor}-${ceiling} of ${numRows} results.`
    : 'No results found.';

  return <p className="meta">{message}</p>;
};
