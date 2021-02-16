import { matchSorter } from 'match-sorter';
import { nanoid } from 'nanoid';
import React, { useEffect } from 'react';

import { cx } from '@util/util';
import ListStore from './List.store';
import { ListFilter, ListProps } from './List.types';

function List<T>({
  className,
  emptyMessage,
  Item: ListItem,
  items,
  options
}: ListProps<T>) {
  const filters = ListStore.useStoreState((store) => store.filters);
  const searchString = ListStore.useStoreState((store) => store.searchString);

  const setNumResults = ListStore.useStoreActions(
    (store) => store.setNumResults
  );

  const filteredItems: T[] = items?.filter((row) => {
    return Object.values(filters)?.every((tableFilter: ListFilter<T>) => {
      return tableFilter(row);
    });
  });

  const sortedAndFilteredItems = searchString
    ? matchSorter(filteredItems, searchString, {
        ...options,
        threshold: matchSorter.rankings.ACRONYM
      })
    : filteredItems;

  useEffect(() => {
    setNumResults(sortedAndFilteredItems?.length);
  }, [sortedAndFilteredItems?.length]);

  if (!sortedAndFilteredItems?.length) return <p>{emptyMessage}</p>;

  const css = cx('o-list', { [className]: className });

  return (
    <div className={css}>
      {sortedAndFilteredItems?.map((value) => {
        // @ts-ignore b/c should have ID.
        return <ListItem key={value?.id ?? nanoid()} {...value} />;
      })}
    </div>
  );
}

export default List;
