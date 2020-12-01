/**
 * @fileoverview Component: SearchBar
 * - Deep searches through every row in the table, and since most of the rows
 * data values are all strings, no complex logic is needed to search.
 * @author Rami Abdou
 */

import React, { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';

import Table from '../Table.store';

type SearchBarProps = { placeholder?: string };

export default ({ placeholder }: SearchBarProps) => {
  const [value, setValue] = useState('');

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
        placeholder={placeholder ?? 'Search...'}
        type="text"
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
    </div>
  );
};
