import { query } from 'gql-query-builder';
import Fields from 'gql-query-builder/build/Fields';
import VariableOptions from 'gql-query-builder/build/VariableOptions';
import { useQuery as useGQLQuery } from 'graphql-hooks';
import { Schema } from 'normalizr';

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
  types,
  variables
}: UseQueryArgs<S>): QueryResult<T> {
  const { data, error, loading } = useGQLQuery(
    query({ fields, operation, variables: types }).query,
    variables ? { variables } : {}
  );

  const result: QueryResult<T> = {
    data: data ? (data[operation] as T) : (null as T),
    error: getGraphQLError(error),
    loading
  };

  return result;
}

export default useBloomQuery;
