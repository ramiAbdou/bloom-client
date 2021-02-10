import { Masonry } from 'masonic';
import { matchSorter } from 'match-sorter';
import React, { useEffect } from 'react';

import ListStore from './List.store';
import { MasonryListProps } from './List.types';

function MasonryList<T>({
  emptyMessage,
  items,
  options,
  ...props
}: MasonryListProps<T>) {
  const numResults = ListStore.useStoreState((store) => store.numResults);
  const searchString = ListStore.useStoreState((store) => store.searchString);

  const setNumResults = ListStore.useStoreActions(
    (store) => store.setNumResults
  );

  const sortedItems = searchString
    ? matchSorter(items, searchString, {
        ...options,
        threshold: matchSorter.rankings.ACRONYM
      })
    : items;

  useEffect(() => {
    const { length } = sortedItems ?? [];
    if (length !== numResults) setNumResults(length);
  }, [sortedItems?.length]);

  if (!numResults) return <p>{emptyMessage}</p>;

  return (
    <Masonry
      key={`${searchString}-${numResults}`}
      columnGutter={16}
      items={sortedItems}
      overscanBy={5}
      style={{ outline: 'none' }}
      {...props}
    />
  );
}

export default MasonryList;
