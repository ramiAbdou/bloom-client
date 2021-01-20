import { Masonry, MasonryProps } from 'masonic';
import { matchSorter, MatchSorterOptions } from 'match-sorter';
import React, { useEffect } from 'react';

import { cx } from '@util/util';
import ListStore from './List.store';

interface ListProps<T> extends MasonryProps<T> {
  items: T[];
  options: MatchSorterOptions<T>;
}

function List<T>({ className, items, options, render }: ListProps<T>) {
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

  const css = cx('', { [className]: className });

  return (
    <Masonry
      key={`${searchString}-${numResults}`}
      className={css}
      columnGutter={16}
      items={sortedItems ?? []}
      overscanBy={5}
      render={render}
    />
  );
}

export default List;
