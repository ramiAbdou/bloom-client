import { useMutation as useGraphQlHooksMutation } from 'graphql-hooks';
import { useEffect, useMemo } from 'react';

import { useStoreActions } from '@store/Store';
import { getGraphQLError } from '@util/util';
import { UseMutationArgs, UseMutationResult } from './useMutation.types';

function useMutation<T = any, S = any>({
  deleteArgs,
  format,
  query,
  name,
  schema,
  variables: initialVariables
}: UseMutationArgs<T, S>): UseMutationResult<T, S> {
  const deleteEntities = useStoreActions(({ db }) => db.deleteEntities);
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const [mutationFn, { data, error, loading }] = useGraphQlHooksMutation(
    query,
    initialVariables ? { variables: initialVariables } : {}
  );

  const typedMutationFn = async (variables?: S) => {
    const result = await mutationFn({
      variables: variables ?? initialVariables
    });

    return {
      data: result.data ? (result.data[name] as T) : (null as T),
      error: getGraphQLError(result.error),
      loading: result.loading
    };
  };

  const result = {
    data: data ? (data[name] as T) : (null as T),
    error: getGraphQLError(error),
    loading
  };

  const memoizedSchema = useMemo(() => schema, []);

  useEffect(() => {
    if (result.data && deleteArgs) deleteEntities(deleteArgs);
  }, [result.data, deleteArgs]);

  useEffect(() => {
    if (result.data && schema) {
      const formattedData = format ? format(result.data) : result.data;
      mergeEntities({ data: formattedData, schema });
    }
  }, [result.data, memoizedSchema]);

  return [typedMutationFn, result];
}

export default useMutation;
