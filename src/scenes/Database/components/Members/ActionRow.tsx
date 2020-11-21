/**
 * @fileoverview Scene: Action Row
 * @author Rami Abdou
 */

import React from 'react';
import { IoIosSearch } from 'react-icons/io';

import { FilterIcon } from './ActionButton';

const SearchBar = () => (
  <div className="s-database-search">
    <IoIosSearch />
    <input placeholder="Search members..." type="text" />
  </div>
);

export default () => {
  return (
    <div className="s-database-action-row">
      <SearchBar />

      <div>
        <FilterIcon />
      </div>
    </div>
  );
};
