import { mutation } from 'gql-query-builder';
import Fields from 'gql-query-builder/build/Fields';
import VariableOptions from 'gql-query-builder/build/VariableOptions';
import { useMutation as useGraphQlHooksMutation } from 'graphql-hooks';

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

function useBloomMutation<T = any, S = any>({
  fields,
  operation,
  types,
  variables: initialVariables
}: UseMutationArgs<S>): MutationResult<T, S> {
  const [mutationFn, { data, loading }] = useGraphQlHooksMutation(
    mutation({ fields, operation, variables: types }).query,
    initialVariables ? { variables: initialVariables } : {}
  );

  const typedMutationFn = async (variables?: S) => {
    const result = await mutationFn({
      variables: variables ?? initialVariables
    });

    return {
      data: result.data ? (result.data[operation] as T) : (null as T),
      error: 'There was an error executing this operation.',
      loading: result.loading
    };
  };

  const result = {
    data: data ? (data[operation] as T) : (null as T),
    error: 'There was an error executing this operation.',
    loading
  };

  return [typedMutationFn, result];
}

export default useBloomMutation;
