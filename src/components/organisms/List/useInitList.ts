import deepequal from 'fast-deep-equal';
import { useEffect } from 'react';

import ListStore from './List.store';
import { ListProps } from './List.types';

/**
 * Initializes the list by setting the items, match sorter options and
 * prepareForFilter arguments.
 */
const useInitList = (props: Pick<ListProps, 'items' | 'options'>): void => {
  const { items, options } = props;
  const storedItems: any[] = ListStore.useStoreState((state) => state.items);
  const setItems = ListStore.useStoreActions((state) => state.setItems);
  const setOptions = ListStore.useStoreActions((state) => state.setOptions);

  useEffect(() => {
    setOptions(options);
  }, []);

  // // Used primarily for the removal of rows. This will not update the
  // // data if the number of rows doesn't change.
  useEffect(() => {
    if (!deepequal(storedItems, items)) setItems(items ?? []);
  }, [items]);
};

export default useInitList;
