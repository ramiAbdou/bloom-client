import { Schema } from 'normalizr';

export interface UseQueryArgs<T, S> {
  activeId?: boolean;
  format?: (data: T) => any;
  name: string;
  query: string;
  schema?: Schema;
  variables?: S;
}

export interface UseQueryResult<T, S> {
  data: T;
  error: string;
  loading: boolean;
}
