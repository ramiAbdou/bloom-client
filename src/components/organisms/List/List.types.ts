import { MasonryProps } from 'masonic';
import { MatchSorterOptions } from 'match-sorter';

import { ClassNameProps } from '@constants';

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
