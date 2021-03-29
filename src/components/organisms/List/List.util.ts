import { State } from 'easy-peasy';
import { matchSorter } from 'match-sorter';
import hash from 'object-hash';

import { ListModel } from './List.types';
import { ListFilterArgs } from './ListFilter/ListFilter.types';

/**
 * Returns a hashed cache key based on the filters, custom filters, and the
 * search string.
 */
export const getListCacheKey = (state: State<ListModel>): string => {
  const { customFilters, filters, searchString } = state;
  return hash({ customFilters, filters, searchString });
};

/**
 * Returns the filtered items in the List based upon custom filters, quick
 * filters, and the search string.
 */
export const runListFilters = (state: State<ListModel>): any[] => {
  const filteredItems = [...state.items]
    ?.filter((entity) => {
      const customFilters = Object.values(state.customFilters);

      const preparedEntity = state.prepareForFilter
        ? state.prepareForFilter(entity)
        : entity;

      return customFilters.every(
        ({ questionId, value: values }: ListFilterArgs) => {
          const value = preparedEntity[questionId];
          return values?.includes(value);
        }
      );
    })
    ?.filter((entity) =>
      Object.values(state.filters)?.every((listFilter) => listFilter(entity))
    );

  if (!state.searchString) return filteredItems;

  return matchSorter(filteredItems, state.searchString, {
    ...state.options,
    threshold: matchSorter.rankings.ACRONYM
  });
};
