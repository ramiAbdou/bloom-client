import deepequal from 'fast-deep-equal';
import { useEffect } from 'react';

import ListStore from './List.store';
import { ListProps } from './List.types';

/**
 * Initializes the list by setting the items, match sorter options and
 * prepareForFilter arguments.
 */
const useInitList = ({
  items,
  options,
  prepareForFilter
}: Pick<ListProps, 'items' | 'options' | 'prepareForFilter'>) => {
  const storedItems = ListStore.useStoreState((state) => state.items);
  const setItems = ListStore.useStoreActions((state) => state.setItems);
  const setOptions = ListStore.useStoreActions((state) => state.setOptions);

  const setPrepareForFilter = ListStore.useStoreActions(
    (state) => state.setPrepareForFilter
  );

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
