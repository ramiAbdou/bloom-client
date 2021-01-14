import { useMutation as useGraphQlHooksMutation } from 'graphql-hooks';
import { Schema } from 'normalizr';
import { useEffect, useMemo } from 'react';

import { useStoreActions } from '@store/Store';
import { getGraphQLError } from '@util/util';

type UseMutationArgs<T, S> = {
  format?: (data: T) => any;
  name: string;
  query: string;
  schema?: Schema<any>;
  variables?: S;
};

type UseMutationResult<T> = { data: T; error: string; loading: boolean };

type UseMutation<T, S> = [
  (variables?: S) => Promise<UseMutationResult<T>>,
  UseMutationResult<T>
];

function useMutation<T = any, S = any>({
  format,
  query,
  name,
  schema,
  variables: initialVariables
}: UseMutationArgs<T, S>): UseMutation<T, S> {
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
    if (result.data && schema) {
      const formattedData = format ? format(result.data) : result.data;
      mergeEntities({ data: formattedData, schema });
    }
  }, [result.data, memoizedSchema]);

  return [typedMutationFn, result];
}

export default useMutation;
