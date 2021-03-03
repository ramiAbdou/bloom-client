import Fields from 'gql-query-builder/build/Fields';
import VariableOptions from 'gql-query-builder/build/VariableOptions';
import { Schema } from 'normalizr';

export interface UseQueryArgs<T, S> {
  fields?: Fields;
  operation: string;
  schema?: Schema;
  types?: VariableOptions;
  variables?: S;
}

export interface QueryResult<T = any, S = any> {
  data: T;
  error: string;
  loading: boolean;
}
