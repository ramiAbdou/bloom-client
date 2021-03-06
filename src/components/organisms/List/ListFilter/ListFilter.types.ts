import { Action } from 'easy-peasy';

import { ValueProps } from '@util/constants';

// ## LIST FILTER FUNCTION

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
  filters: Record<string, ListFilterArgs>;
  openQuestionId: string;
  removeFilter: Action<ListFilterModel, string>;
  setFilter: Action<ListFilterModel, Partial<ListFilterArgs>>;
  setOpenQuestionId: Action<ListFilterModel, string>;
}
