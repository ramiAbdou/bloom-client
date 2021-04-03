import { query } from 'gql-query-builder';
import Fields from 'gql-query-builder/build/Fields';
import VariableOptions from 'gql-query-builder/build/VariableOptions';
import { useQuery as useGQLQuery } from 'graphql-hooks';
import { Schema } from 'normalizr';
import { useEffect } from 'react';

import { useStoreActions } from '@store/Store';
import { QueryEvent } from '@util/constants.events';
import { getGraphQLError } from '@util/util';
import { QueryResult } from './gql.types';

export interface UseQueryArgs<S> {
  fields?: Fields;
  operation: QueryEvent;
  schema?: Schema;
  types?: VariableOptions;
  variables?: S;
}

function useBloomQuery<T = any, S = any>({
  fields,
  operation,
  schema,
  types,
  variables
}: UseQueryArgs<S>): QueryResult<T> {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const { data, error, loading } = useGQLQuery(
    query({ fields, operation, variables: types }).query,
    variables ? { variables } : {}
  );

  const result: QueryResult<T> = {
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

export default useBloomQuery;
