/**
 * @fileoverview Component: Pagination
 * @author Rami Abdou
 */

import React from 'react';

import DisplayingText from './DisplayingText';
import PaginationBar from './PaginationBar';

export default () => (
  <div className="c-table-pagination-ctr">
    <DisplayingText />
    <PaginationBar />
  </div>
);
