import { Masonry, MasonryProps } from 'masonic';
import React from 'react';

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

  if (!items?.length) {
    return <p>{emptyMessage}</p>;
  }

  return (
    <Masonry
      columnGutter={16}
      items={items}
      overscanBy={5}
      style={{ outline: 'none' }}
      {...props}
    />
  );
}

export default MasonryList;
