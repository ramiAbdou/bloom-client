import { query } from 'gql-query-builder';
import { useMutation as useGraphQlHooksMutation } from 'graphql-hooks';
import { useEffect, useMemo } from 'react';

import { useStoreActions } from '@store/Store';
import { getGraphQLError } from '@util/util';
import { UseMutationArgs, UseMutationResult } from './useMutation.types';

function useMutation<T = any, S = any>({
  deleteArgs,
  fields,
  operation,
  schema,
  types,
  variables: initialVariables
}: UseMutationArgs<T, S>): UseMutationResult<T, S> {
  const deleteEntities = useStoreActions(({ db }) => db.deleteEntities);
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const [mutationFn, { data, error, loading }] = useGraphQlHooksMutation(
    query({ fields, operation, variables: types }).query,
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

  const memoizedSchema = useMemo(() => schema, []);

  useEffect(() => {
    if (result.data && deleteArgs) deleteEntities(deleteArgs);
  }, [result.data, deleteArgs]);

  useEffect(() => {
    if (result.data && schema) mergeEntities({ data: result.data, schema });
  }, [result.data, memoizedSchema]);

  return [typedMutationFn, result];
}

export default useMutation;
