import { Masonry, MasonryProps } from 'masonic';
import { matchSorter, MatchSorterOptions } from 'match-sorter';
import React, { useEffect } from 'react';

import ListStore from './List.store';

interface ListProps<T> extends MasonryProps<T> {
  items: T[];
  options?: MatchSorterOptions<T>;
}

function List<T>({ items, options, render, ...props }: ListProps<T>) {
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

  return (
    <Masonry
      key={`${searchString}-${numResults}`}
      columnGutter={16}
      items={sortedItems ?? []}
      overscanBy={5}
      render={render}
      {...props}
    />
  );
}

export default List;
