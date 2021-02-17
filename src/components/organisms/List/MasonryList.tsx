import { Masonry, MasonryProps } from 'masonic';
import React from 'react';

import ListStore from './List.store';
import { ListProps } from './List.types';
import useInitList from './useInitList';
import useListCacheKey from './useListCacheKey';

interface MasonryListProps<T>
  extends Omit<ListProps<T>, 'render'>,
    MasonryProps<T> {}

function MasonryList<T>({
  emptyMessage,
  items,
  options,
  prepareForFilter,
  ...props
}: MasonryListProps<T>) {
  useInitList({ items, options, prepareForFilter });
  const cacheKey = useListCacheKey();
  const filteredItems = ListStore.useStoreState((state) => state.filteredItems);

  if (!filteredItems?.length) return <p>{emptyMessage}</p>;

  return (
    <Masonry
      key={cacheKey}
      columnGutter={16}
      items={[...filteredItems]}
      overscanBy={5}
      style={{ outline: 'none' }}
      {...props}
    />
  );
}

export default MasonryList;
