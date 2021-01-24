import { matchSorter } from 'match-sorter';
import { nanoid } from 'nanoid';
import React, { useEffect } from 'react';

import ListStore from './List.store';
import { ListProps } from './List.types';

function List<T>({ emptyMessage, Item, items, options }: ListProps<T>) {
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

  const { length } = sortedItems ?? [];

  useEffect(() => {
    if (length !== numResults) setNumResults(length);
  }, [length]);

  if (!numResults) return <p>{emptyMessage}</p>;

  return (
    <div className="o-list">
      {sortedItems.map((value) => {
        // @ts-ignore b/c should have ID.
        return <Item key={value?.id ?? nanoid()} {...value} />;
      })}
    </div>
  );
}

export default List;
