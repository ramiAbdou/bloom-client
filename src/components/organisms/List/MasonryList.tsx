import { Masonry, MasonryProps } from 'masonic';
import React from 'react';

import ListStore from './List.store';
import { ListProps } from './List.types';
import useInitList from './useInitList';

interface MasonryListProps<T>
  extends Omit<ListProps<T>, 'render'>,
    MasonryProps<T> {}

function MasonryList<T>({
  emptyMessage,
  items,
  options,
  ...props
}: MasonryListProps<T>): JSX.Element {
  useInitList({ items, options });

  const cacheKey = ListStore.useStoreState((state) => state.cacheKey);
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
