import { Action } from 'easy-peasy';

import { ValueProps } from '@util/constants';

// ## LIST FILTER FUNCTION

export type ListFilterFunction<T = unknown> = (
  row: T | Record<string, unknown>
) => boolean;

export interface ListFilterArgs extends ValueProps {
  questionId: string;
}

// ## LIST QUICK FILTER

export type ListQuickFilterArgs<T = unknown> = {
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
