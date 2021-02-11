import { query as queryFn } from 'gql-query-builder';
import { useManualQuery as useGQLManualQuery } from 'graphql-hooks';
import { useEffect, useMemo } from 'react';

import { useStoreActions } from '@store/Store';
import { getGraphQLError } from '@util/util';
import { UseMutationResult } from './useMutation.types';
import { UseQueryArgs, UseQueryResult } from './useQuery.types';

function useManualQuery<T = any, S = any>({
  fields,
  query,
  operation,
  schema,
  types,
  variables: initialVariables
}: UseQueryArgs<T, S>): UseMutationResult<T, S> {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const [manualQueryFn, { data, error, loading }] = useGQLManualQuery(
    query ?? queryFn({ fields, operation, variables: types }).query,
    initialVariables ? { variables: initialVariables } : {}
  );

  const typedManualQueryFn = async (variables?: S) => {
    const result = await manualQueryFn({
      variables: variables ?? initialVariables
    });

    return {
      data: result.data ? (result.data[operation] as T) : (null as T),
      error: getGraphQLError(result.error),
      loading: result.loading
    };
  };

  const result: UseQueryResult<T, S> = {
    data: data ? (data[operation] as T) : (null as T),
    error: getGraphQLError(error),
    loading
  };

  const memoizedSchema = useMemo(() => schema, []);

  // Updates the global entities store if a schema is passed in. Also formats
  // the data to match the schema if need be.
  useEffect(() => {
    if (result.data && schema) mergeEntities({ data: result.data, schema });
  }, [result.data, memoizedSchema]);

  return [typedManualQueryFn, result];
}

export default useManualQuery;
