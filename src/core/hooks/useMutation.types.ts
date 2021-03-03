import Fields from 'gql-query-builder/build/Fields';
import VariableOptions from 'gql-query-builder/build/VariableOptions';
import { Schema } from 'normalizr';

export type UseMutationArgs<T, S> = {
  fields?: Fields;
  operation: string;
  schema?: Schema;
  types?: VariableOptions;
  variables?: S;
};

type UseMutationFnResult<T> = { data: T; error: string; loading: boolean };

export type UseMutationResult<T, S> = [
  (variables?: S) => Promise<UseMutationFnResult<T>>,
  UseMutationFnResult<T>
];
