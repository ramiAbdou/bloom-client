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

export type ListFilter<T = any> = (row: T) => boolean;

export interface ListFilterArgs extends IdProps, ValueProps {
  columnId: string;
}

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
