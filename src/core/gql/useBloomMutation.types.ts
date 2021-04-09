import Fields from 'gql-query-builder/build/Fields';
import VariableOptions from 'gql-query-builder/build/VariableOptions';

import { MutationEvent } from '@util/constants.events';

export type UseMutationArgs<S> = {
  fields?: Fields;
  operation: MutationEvent;
  types?: VariableOptions;
  variables?: S;
};

export type UseMutationFnResult<T> = {
  data: T;
  error: string;
  loading: boolean;
};

export type MutationResultVariablesFunction<T, S> = (
  variables?: S
) => Promise<UseMutationFnResult<T>>;

export type MutationResult<T, S> = [
  (variables?: S) => Promise<UseMutationFnResult<T>>,
  UseMutationFnResult<T>
];
