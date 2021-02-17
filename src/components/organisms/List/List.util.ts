import { State } from 'easy-peasy';
import { matchSorter } from 'match-sorter';

import { ListModel } from './List.types';
import { ListFilterFunction } from './ListFilter/ListFilter.types';

interface RunListFiltersArgs {
  filters?: Record<string, ListFilterFunction>;
  searchString?: string;
  state: State<ListModel>;
}

/**
 * Returns the filtered Table rows based on the active filters as well as
 * the Table search string.
 */
export const runListFilters = ({
  filters,
  searchString,
  state
}: RunListFiltersArgs) => {
  const items = [...state.items];

  filters = filters ?? state.filters;
  searchString = searchString ?? state.searchString;

  const filteredItems = [...items]?.filter((entity) => {
    return Object.entries(filters)?.every(
      ([filterId, listFilter]: [string, ListFilterFunction]) => {
        const preparedEntity =
          filterId === 'FILTER_CUSTOM' && state.prepareForFilter
            ? state.prepareForFilter(entity)
            : entity;

        return listFilter(preparedEntity);
      }
    );
  });

  if (!searchString) return filteredItems;

  return matchSorter(filteredItems, searchString, {
    ...state.options,
    threshold: matchSorter.rankings.ACRONYM
  });
};
