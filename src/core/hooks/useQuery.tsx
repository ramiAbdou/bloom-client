import { query } from 'gql-query-builder';
import { useQuery as useGQLQuery } from 'graphql-hooks';
import { useEffect } from 'react';

import { useStoreActions } from '@store/Store';
import { getGraphQLError } from '@util/util';
import { UseQueryArgs, UseQueryResult } from './useQuery.types';

function useQuery<T = any, S = any>({
  fields,
  operation,
  schema,
  types,
  variables
}: UseQueryArgs<T, S>): UseQueryResult<T, S> {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const { data, error, loading } = useGQLQuery(
    query({ fields, operation, variables: types }).query,
    variables ? { variables } : {}
  );

  const result: UseQueryResult<T, S> = {
    data: data ? (data[operation] as T) : (null as T),
    error: getGraphQLError(error),
    loading
  };

  // Updates the global entities store if a schema is passed in. Also formats
  // the data to match the schema if need be.
  useEffect(() => {
    if (result.data && schema) mergeEntities({ data: result.data, schema });
  }, [result.data, schema]);

  return result;
}

export default useQuery;
