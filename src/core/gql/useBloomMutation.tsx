import { mutation } from 'gql-query-builder';
import { useMutation as useGraphQlHooksMutation } from 'graphql-hooks';

import { getGraphQLError } from '@util/util';
import { MutationResult, UseMutationArgs } from './useBloomMutation.types';

function useBloomMutation<T = any, S = any>({
  fields,
  operation,
  types,
  variables: initialVariables
}: UseMutationArgs<S>): MutationResult<T, S> {
  const [mutationFn, { data, error, loading }] = useGraphQlHooksMutation(
    mutation({ fields, operation, variables: types }).query,
    initialVariables ? { variables: initialVariables } : {}
  );

  const typedMutationFn = async (variables?: S) => {
    const result = await mutationFn({
      variables: variables ?? initialVariables
    });

    return {
      data: result.data ? (result.data[operation] as T) : (null as T),
      error: getGraphQLError(result.error),
      loading: result.loading
    };
  };

  const result = {
    data: data ? (data[operation] as T) : (null as T),
    error: getGraphQLError(error),
    loading
  };

  return [typedMutationFn, result];
}

export default useBloomMutation;
