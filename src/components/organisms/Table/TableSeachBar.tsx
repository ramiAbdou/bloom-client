import React, { useEffect, useState } from 'react';

import SearchBar from '@molecules/SearchBar/SearchBar';
import Table from './Table.store';

type SearchBarProps = { placeholder?: string };

/**
 * Deep searches through every row in the table, and since most of the rows
 * data values are all strings, no complex logic is needed to search.
 */
const TableSearchBar: React.FC<SearchBarProps> = ({ placeholder }) => {
  const [value, setValue] = useState('');

  const setSearchString = Table.useStoreActions(
    (store) => store.setSearchString
  );

  useEffect(() => {
    const timeout = setTimeout(() => setSearchString(value), 300);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <SearchBar placeholder={placeholder} value={value} onChange={setValue} />
  );
};

export default TableSearchBar;
