import React, { useEffect, useState } from 'react';

import SearchBar, { SearchBarProps } from '@molecules/SearchBar/SearchBar';
import TableStore from './Table.store';

/**
 * Deep searches through every row in the table, and since most of the rows
 * data values are all strings, no complex logic is needed to search.
 */
const TableSearchBar: React.FC<
  Pick<SearchBarProps, 'className' | 'placeholder'>
> = (props) => {
  const [value, setValue] = useState<string>('');

  const setSearchString = TableStore.useStoreActions((state) => {
    return state.setSearchString;
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      return setSearchString(value);
    }, 300);

    return () => {
      return clearTimeout(timeout);
    };
  }, [value]);

  return <SearchBar value={value} onChange={setValue} {...props} />;
};

export default TableSearchBar;
