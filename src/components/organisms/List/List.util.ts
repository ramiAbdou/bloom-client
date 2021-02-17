import { State } from 'easy-peasy';
import { matchSorter } from 'match-sorter';

import { ListModel } from './List.types';
import { ListFilterFunction } from './ListFilter/ListFilter.types';

/**
 * Returns the filtered items in the List.
 */
export const runListFilters = (state: State<ListModel>) => {
  const items = [...state.items];

  const filteredItems = [...items]?.filter((entity) => {
    return Object.entries(state.filters)?.every(
      ([filterId, listFilter]: [string, ListFilterFunction]) => {
        const preparedEntity =
          filterId === 'FILTER_CUSTOM' && state.prepareForFilter
            ? state.prepareForFilter(entity)
            : entity;

        return listFilter(preparedEntity);
      }
    );
  });

  if (!state.searchString) return filteredItems;

  return matchSorter(filteredItems, state.searchString, {
    ...state.options,
    threshold: matchSorter.rankings.ACRONYM
  });
};
