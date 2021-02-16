import { Masonry } from 'masonic';
import { matchSorter } from 'match-sorter';
import React, { useEffect } from 'react';

import ListStore from './List.store';
import { ListFilter, MasonryListProps } from './List.types';

function MasonryList<T>({
  emptyMessage,
  items,
  options,
  ...props
}: MasonryListProps<T>) {
  const filters = ListStore.useStoreState((store) => store.filters);
  const numResults = ListStore.useStoreState((store) => store.numResults);
  const searchString = ListStore.useStoreState((store) => store.searchString);

  const setNumResults = ListStore.useStoreActions(
    (store) => store.setNumResults
  );

  const filteredItems: T[] = [...items]?.filter((row) => {
    return Object.values(filters)?.every((tableFilter: ListFilter<T>) => {
      return tableFilter(row);
    });
  });

  const sortedItems = searchString
    ? matchSorter([...filteredItems], searchString, {
        ...options,
        threshold: matchSorter.rankings.ACRONYM
      })
    : [...filteredItems];

  useEffect(() => {
    const { length } = sortedItems ?? [];
    if (length !== numResults) setNumResults(length);
  }, [sortedItems?.length]);

  if (!numResults) return <p>{emptyMessage}</p>;

  return (
    <Masonry
      key={`${searchString}-${Object.keys(filters).join(',')}`}
      columnGutter={16}
      items={[...sortedItems]}
      overscanBy={5}
      style={{ outline: 'none' }}
      {...props}
    />
  );
}

export default MasonryList;
