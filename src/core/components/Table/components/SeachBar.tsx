import React, { useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';

import Table from '../Table.store';

/**
 * Deep searches through every row in the table, and since most of the rows
 * data values are all strings, no complex logic is needed to search.
 */
export default ({ placeholder }) => {
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
      <IoSearch />
      <input
        placeholder={placeholder ?? 'Search...'}
        type="text"
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
    </div>
  );
};
