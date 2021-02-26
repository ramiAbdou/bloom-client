import React, { useEffect, useState } from 'react';

import { BaseProps } from '@util/constants';
import SearchBar from '@molecules/SearchBar/SearchBar';
import TableStore from './Table.store';

interface TableSearchBarProps extends BaseProps {
  placeholder?: string;
}

/**
 * Deep searches through every row in the table, and since most of the rows
 * data values are all strings, no complex logic is needed to search.
 */
const TableSearchBar: React.FC<TableSearchBarProps> = ({
  className,
  placeholder
}) => {
  const [value, setValue] = useState('');

  const setSearchString = TableStore.useStoreActions(
    (store) => store.setSearchString
  );

  useEffect(() => {
    const timeout = setTimeout(() => setSearchString(value), 300);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <SearchBar
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={setValue}
    />
  );
};

export default TableSearchBar;
