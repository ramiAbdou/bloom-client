import { matchSorter } from 'match-sorter';
import { nanoid } from 'nanoid';
import React, { useEffect } from 'react';

import { cx } from '@util/util';
import ListStore from './List.store';
import { ListProps } from './List.types';

function List<T>({
  className,
  emptyMessage,
  Item: ListItem,
  items,
  options
}: ListProps<T>) {
  const searchString = ListStore.useStoreState((store) => store.searchString);

  const setNumResults = ListStore.useStoreActions(
    (store) => store.setNumResults
  );

  const sortedAndFilteredItems = searchString
    ? matchSorter(items, searchString, {
        ...options,
        threshold: matchSorter.rankings.ACRONYM
      })
    : items;

  useEffect(() => {
    setNumResults(sortedAndFilteredItems?.length);
  }, [sortedAndFilteredItems?.length]);

  if (!sortedAndFilteredItems?.length) return <p>{emptyMessage}</p>;

  const css = cx('o-list', { [className]: className });

  return (
    <div className={css}>
      {sortedAndFilteredItems.map((value) => {
        // @ts-ignore b/c should have ID.
        return <ListItem key={value?.id ?? nanoid()} {...value} />;
      })}
    </div>
  );
}

export default List;
