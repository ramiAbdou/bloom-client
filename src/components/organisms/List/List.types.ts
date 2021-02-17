import { Action } from 'easy-peasy';
import { MatchSorterOptions } from 'match-sorter';

import { ClassNameProps, ValueProps } from '@constants';

// ## PREPARE FOR FILTER

export type PrepareForFilter<T = any> = (entity: T) => Record<string, any>;

// ## LIST PROPS

export interface ListProps<T> extends ClassNameProps {
  emptyMessage?: string;
  items: T[];
  options?: MatchSorterOptions<T>;
  prepareForFilter?: PrepareForFilter<T>;
  render: React.FC<T>;
}

// ## LIST FILTER

export type ListFilter<T = any> = (row: T | Record<string, any>) => boolean;

export interface ListFilterArgs extends ValueProps {
  questionId: string;
}

export interface ListFilterModel {
  clearFilters: Action<ListFilterModel>;
  filterIds: string[];
  filters: Record<string, ListFilterArgs>;
  removeFilter: Action<ListFilterModel, string>;
  setFilter: Action<ListFilterModel, Partial<ListFilterArgs>>;
}

// ## LIST QUICK FILTER

export type ListQuickFilterArgs<T = any> = {
  filterId: string;
  filter: (row: T) => boolean;
};

// ## LIST MODEL

export interface ListModel<T = any> {
  filteredItems: T[];
  filters: Record<string, ListFilter>;
  items: T[];
  options?: MatchSorterOptions<T>;
  prepareForFilter?: PrepareForFilter;
  removeFilter: Action<ListModel<T>, string>;
  searchString: string;
  setFilter: Action<ListModel<T>, ListQuickFilterArgs>;
  setItems: Action<ListModel<T>, T[]>;
  setOptions: Action<ListModel<T>, MatchSorterOptions<T>>;
  setPrepareForFilter: Action<ListModel<T>, PrepareForFilter>;
  setSearchString: Action<ListModel<T>, string>;
}
