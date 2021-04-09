import { nanoid } from 'nanoid';
import React from 'react';

import { cx } from '@util/util';
import ListStore from './List.store';
import { ListProps } from './List.types';
import useInitList from './useInitList';

function List<T>({
  className,
  emptyMessage,
  render: ListItem,
  items,
  options,
  prepareForFilter
}: ListProps<T>): JSX.Element {
  useInitList({ items, options, prepareForFilter });

  const filteredItems = ListStore.useStoreState((state) => state.filteredItems);

  if (!filteredItems?.length) return <p>{emptyMessage}</p>;

  const css: string = cx('o-list', {}, className);

  return (
    <div className={css}>
      {filteredItems?.map((value) => (
        <ListItem key={value?.id ?? nanoid()} {...value} />
      ))}
    </div>
  );
}

export default List;
