import { Action } from 'easy-peasy';
import { MasonryProps } from 'masonic';
import { MatchSorterOptions } from 'match-sorter';

import { ClassNameProps, IdProps, ValueProps } from '@constants';

export interface ListProps<T> extends ClassNameProps {
  Item: React.FC<T>;
  emptyMessage?: string;
  items: T[];
  options?: MatchSorterOptions<T>;
}

export interface MasonryListProps<T> extends MasonryProps<T> {
  emptyMessage?: string;
  items: T[];
  options?: MatchSorterOptions<T>;
}

// ## LIST FILTER

export type ListFilter<T = any> = (row: T) => boolean;

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

export interface ListModel {
  filters: Record<string, ListFilter>;
  numResults: number;
  removeFilter: Action<ListModel, string>;
  searchString: string;
  setFilter: Action<ListModel, ListQuickFilterArgs>;
  setNumResults: Action<ListModel, number>;
  setSearchString: Action<ListModel, string>;
}
