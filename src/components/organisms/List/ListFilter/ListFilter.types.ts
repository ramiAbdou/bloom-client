import { Action } from 'easy-peasy';

import { ValueProps } from '@constants';

// ## LIST FILTER

export type ListFilterFunction<T = any> = (
  row: T | Record<string, any>
) => boolean;

export interface ListFilterArgs extends ValueProps {
  questionId: string;
}

// ## LIST QUICK FILTER

export type ListQuickFilterArgs<T = any> = {
  filterId: string;
  filter: (row: T) => boolean;
};

// ## LIST MODEL

export interface ListFilterModel {
  clearFilters: Action<ListFilterModel>;
  filterIds: string[];
  filters: Record<string, ListFilterArgs>;
  removeFilter: Action<ListFilterModel, string>;
  setFilter: Action<ListFilterModel, Partial<ListFilterArgs>>;
}
