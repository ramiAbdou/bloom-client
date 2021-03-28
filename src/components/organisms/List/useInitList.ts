import deepequal from 'fast-deep-equal';
import { useEffect } from 'react';

import ListStore from './List.store';
import { ListProps } from './List.types';

/**
 * Initializes the list by setting the items, match sorter options and
 * prepareForFilter arguments.
 */
const useInitList = (
  props: Pick<ListProps, 'items' | 'options' | 'prepareForFilter'>
): void => {
  const { items, options, prepareForFilter } = props;

  const storedItems: unknown[] = ListStore.useStoreState((state) => {
    return state.items;
  });

  const setItems = ListStore.useStoreActions((state) => {
    return state.setItems;
  });

  const setOptions = ListStore.useStoreActions((state) => {
    return state.setOptions;
  });

  const setPrepareForFilter = ListStore.useStoreActions((state) => {
    return state.setPrepareForFilter;
  });

  useEffect(() => {
    setOptions(options);
    setPrepareForFilter(prepareForFilter);
  }, []);

  // // Used primarily for the removal of rows. This will not update the
  // // data if the number of rows doesn't change.
  useEffect(() => {
    if (!deepequal(storedItems, items)) setItems(items ?? []);
  }, [items]);
};

export default useInitList;
