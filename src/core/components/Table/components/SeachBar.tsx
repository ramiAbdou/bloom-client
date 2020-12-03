/**
 * @fileoverview Component: SearchBar
 * - Deep searches through every row in the table, and since most of the rows
 * data values are all strings, no complex logic is needed to search.
 * @author Rami Abdou
 */

import React, { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';

import { ValueProps } from '@constants';
import Table from '../Table.store';

export default ({ value }: ValueProps) => {
  const [localSearchString, setLocalSearchString] = useState('');

  const setSearchString = Table.useStoreActions(
    (store) => store.setSearchString
  );

  useEffect(() => {
    const timeout = setTimeout(() => setSearchString(value), 300);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="c-table-search">
      <IoIosSearch />
      <input
        type="text"
        value={localSearchString ?? value}
        onChange={({ target }) => setLocalSearchString(target.value)}
      />
    </div>
  );
};
