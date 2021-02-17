import { Masonry } from 'masonic';
import React from 'react';

import ListStore from './List.store';
import { MasonryListProps } from './List.types';
import useInitList from './useInitList';

function MasonryList<T>({
  emptyMessage,
  items,
  options,
  prepareForFilter,
  ...props
}: MasonryListProps<T>) {
  useInitList({ items, options });

  const filtersKey: string = ListStore.useStoreState((state) => {
    return Object.keys(state.filters).join(',');
  });

  const filteredItems = ListStore.useStoreState((state) => state.filteredItems);
  const searchString = ListStore.useStoreState((state) => state.searchString);

  if (!filteredItems?.length) return <p>{emptyMessage}</p>;

  return (
    <Masonry
      key={`${searchString}-${filtersKey}`}
      columnGutter={16}
      items={[...filteredItems]}
      overscanBy={5}
      style={{ outline: 'none' }}
      {...props}
    />
  );
}

export default MasonryList;
