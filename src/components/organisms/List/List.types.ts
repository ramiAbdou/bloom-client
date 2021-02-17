import { Action, State } from 'easy-peasy';
import { MasonryProps } from 'masonic';
import { MatchSorterOptions } from 'match-sorter';

import { ClassNameProps, ValueProps } from '@constants';
import { DbModel } from '@store/Db/Db.types';

export interface PrepareForFilterArgs<T> {
  db?: State<DbModel>;
  entity: T;
}

export interface ListProps<T> extends ClassNameProps {
  Item: React.FC<T>;
  emptyMessage?: string;
  items: T[];
  options?: MatchSorterOptions<T>;
  prepareForFilter?: (entity: T) => Record<string, any>;
}

export interface MasonryListProps<T> extends MasonryProps<T> {
  emptyMessage?: string;
  items: T[];
  options?: MatchSorterOptions<T>;
  prepareForFilter?: (entity: T) => Record<string, any>;
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

export interface ListModel<T = any> {
  filteredItems: T[];
  filters: Record<string, ListFilter>;
  items: T[];
  options?: MatchSorterOptions<T>;
  removeFilter: Action<ListModel<T>, string>;
  searchString: string;
  setFilter: Action<ListModel<T>, ListQuickFilterArgs>;
  setItems: Action<ListModel<T>, T[]>;
  setOptions: Action<ListModel<T>, MatchSorterOptions<T>>;
  setSearchString: Action<ListModel<T>, string>;
}
