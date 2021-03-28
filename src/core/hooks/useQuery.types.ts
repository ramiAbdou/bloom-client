import Fields from 'gql-query-builder/build/Fields';
import VariableOptions from 'gql-query-builder/build/VariableOptions';
import { Schema } from 'normalizr';

import { QueryEvent } from '@util/constants.events';

export interface UseQueryArgs<S> {
  fields?: Fields;
  operation: QueryEvent;
  schema?: Schema;
  types?: VariableOptions;
  variables?: S;
}

export interface QueryResult<T = any> {
  data: T;
  error: string;
  loading: boolean;
}
