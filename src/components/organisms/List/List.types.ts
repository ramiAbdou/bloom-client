import { Action } from 'easy-peasy';
import { MatchSorterOptions } from 'match-sorter';

import { ClassNameProps } from '@util/constants';
import {
  ListFilterArgs,
  ListFilterFunction,
  ListQuickFilterArgs
} from './ListFilter/ListFilter.types';

// ## PREPARE FOR FILTER

export type PrepareForListFilter<T = any> = (entity: T) => Record<string, any>;

// ## LIST PROPS

export interface ListProps<T = any> extends ClassNameProps {
  emptyMessage?: string;
  items: T[];
  options?: MatchSorterOptions<T>;
  prepareForFilter?: PrepareForListFilter<T>;
  render: React.FC<T>;
}

// ## LIST MODEL

export interface ListModel<T = any> {
  cacheKey: string;
  customFilters: Record<string, ListFilterArgs>;
  filteredItems: T[];
  filters: Record<string, ListFilterFunction>;
  items: T[];
  options?: MatchSorterOptions<T>;
  prepareForFilter?: PrepareForListFilter<T>;
  removeFilter: Action<ListModel<T>, string>;
  searchString: string;
  setCustomFilters: Action<ListModel<T>, Record<string, ListFilterArgs>>;
  setFilter: Action<ListModel<T>, ListQuickFilterArgs>;
  setItems: Action<ListModel<T>, T[]>;
  setOptions: Action<ListModel<T>, MatchSorterOptions<T>>;
  setPrepareForFilter: Action<ListModel<T>, PrepareForListFilter<T>>;
  setSearchString: Action<ListModel<T>, string>;
}
