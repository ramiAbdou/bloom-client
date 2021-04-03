import { query } from 'gql-query-builder';
import Fields from 'gql-query-builder/build/Fields';
import VariableOptions from 'gql-query-builder/build/VariableOptions';
import { useManualQuery as useGQLManualQuery } from 'graphql-hooks';
import { Schema } from 'normalizr';
import { useEffect, useMemo } from 'react';

import { useStoreActions } from '@store/Store';
import { QueryEvent } from '@util/constants.events';
import { getGraphQLError } from '@util/util';
import { QueryResult } from './gql.types';
import { MutationResult } from './useMutation.types';

interface UseQueryArgs<S> {
  fields?: Fields;
  operation: QueryEvent;
  schema?: Schema;
  types?: VariableOptions;
  variables?: S;
}

function useManualQuery<T = any, S = any>({
  fields,
  operation,
  schema,
  types,
  variables: initialVariables
}: UseQueryArgs<S>): MutationResult<T, S> {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const [manualQueryFn, { data, error, loading }] = useGQLManualQuery(
    query({ fields, operation, variables: types }).query,
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

  const result: QueryResult<T> = {
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
