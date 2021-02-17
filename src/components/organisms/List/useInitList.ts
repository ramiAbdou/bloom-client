import deepequal from 'fast-deep-equal';
import { MatchSorterOptions } from 'match-sorter';
import { useEffect } from 'react';

import ListStore from './List.store';

interface UseInitListArgs<T = any> {
  items: T[];
  options: MatchSorterOptions<T>;
}

const useInitList = ({ items, options }: UseInitListArgs) => {
  const storedItems = ListStore.useStoreState((state) => state.items);
  const setItems = ListStore.useStoreActions((state) => state.setItems);
  const setOptions = ListStore.useStoreActions((state) => state.setOptions);

  // // Used primarily for the removal of rows. This will not update the
  // // data if the number of rows doesn't change.
  useEffect(() => {
    if (!deepequal(storedItems, items)) setItems(items ?? []);
  }, [items]);

  useEffect(() => {
    setOptions(options);
  }, [options]);
};

export default useInitList;
