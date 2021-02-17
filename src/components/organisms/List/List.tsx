import { nanoid } from 'nanoid';
import React from 'react';

import { cx } from '@util/util';
import ListStore from './List.store';
import { ListProps } from './List.types';
import useInitList from './useInitList';

function List<T>({
  className,
  emptyMessage,
  Item: ListItem,
  items,
  options
}: ListProps<T>) {
  useInitList({ items, options });

  const filteredItems = ListStore.useStoreState((state) => state.filteredItems);
  if (!filteredItems?.length) return <p>{emptyMessage}</p>;

  const css = cx('o-list', { [className]: className });

  return (
    <div className={css}>
      {filteredItems?.map((value) => {
        // @ts-ignore b/c should have ID.
        return <ListItem key={value?.id ?? nanoid()} {...value} />;
      })}
    </div>
  );
}

export default List;
