/**
 * @fileoverview Component: Pagination
 * @author Rami Abdou
 */

import React from 'react';

import Table from '../../Table.store';
import DisplayingText from './DisplayingText';
import PaginationBar from './PaginationBar';

export default () => {
  const numRows = Table.useStoreState((store) => store.filteredData.length);
  return (
    <div className="c-table-pagination-ctr">
      <DisplayingText />
      {numRows >= 100 && <PaginationBar />}
    </div>
  );
};
