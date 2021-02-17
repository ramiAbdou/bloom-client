import React, { useEffect, useState } from 'react';

import SearchBar, { SearchBarProps } from '@molecules/SearchBar/SearchBar';
import { cx } from '@util/util';
import ListStore from './List.store';

const ListSearchBar: React.FC<Omit<SearchBarProps, 'onChange'>> = ({
  className,
  ...props
}) => {
  const [value, setValue] = useState('');

  const setSearchString = ListStore.useStoreActions(
    (store) => store.setSearchString
  );

  useEffect(() => {
    const timeout = setTimeout(() => setSearchString(value), 300);
    return () => clearTimeout(timeout);
  }, [value]);

  const css = cx('o-list-search', { [className]: className });

  return (
    <SearchBar className={css} value={value} onChange={setValue} {...props} />
  );
};

export default ListSearchBar;
