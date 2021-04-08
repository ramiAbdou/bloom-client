import { query } from 'gql-query-builder';
import Fields from 'gql-query-builder/build/Fields';
import VariableOptions from 'gql-query-builder/build/VariableOptions';
import { useManualQuery as useGQLManualQuery } from 'graphql-hooks';
import { Schema } from 'normalizr';

import { QueryEvent } from '@util/constants.events';
import { getGraphQLError } from '@util/util';
import { QueryResult } from './gql.types';
import { MutationResult } from './useBloomMutation.types';

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
  types,
  variables: initialVariables
}: UseQueryArgs<S>): MutationResult<T, S> {
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

  return [typedManualQueryFn, result];
}

export default useManualQuery;
