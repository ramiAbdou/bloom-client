import ListStore from './List.store';
import ListFilterStore from './ListFilter/ListFilter.store';
import { ListFilterArgs } from './ListFilter/ListFilter.types';

/**
 * Returns a List cache key that is required for the Masonry component to cache
 * all of the items. Uses the custom filter values, all of the filter IDs
 * and the search string to build the key.
 *
 * @example useListCacheKey() => 'cornell-FILTER_CUSTOM-Male,Female'
 */
const useListCacheKey = () => {
  const searchString = ListStore.useStoreState((state) => state.searchString);

  const isCustomFilterApplied: boolean = ListStore.useStoreState((state) => {
    return Object.keys(state.filters).includes('FILTER_CUSTOM');
  });

  const filtersKey: string = ListStore.useStoreState((state) => {
    return Object.keys(state.filters).join(',');
  });

  const customFilterValuesKey: string = ListFilterStore.useStoreState(
    (state) => {
      if (!isCustomFilterApplied) return '';

      return Object.values(state.filters).reduce(
        (acc: string, args: ListFilterArgs) => {
          return acc + args.value?.toString();
        },
        ''
      );
    }
  );

  return `${searchString}-${filtersKey}-${customFilterValuesKey}`;
};

export default useListCacheKey;
