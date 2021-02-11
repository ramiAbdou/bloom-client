import Fields from 'gql-query-builder/build/Fields';
import VariableOptions from 'gql-query-builder/build/VariableOptions';
import { Schema } from 'normalizr';

export interface UseQueryArgs<T, S> {
  fields?: Fields;
  query?: string;
  operation: string;
  schema?: Schema;
  types?: VariableOptions;
  variables?: S;
}

export interface UseQueryResult<T, S> {
  data: T;
  error: string;
  loading: boolean;
}
