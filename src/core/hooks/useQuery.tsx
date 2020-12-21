import { useQuery as useGraphQlHooksQuery } from 'graphql-hooks';

import { getGraphQLError } from '@util/util';

type UseQueryArgs<S> = { name: string; query: string; variables?: S };
type UseQuery<T, S> = { data: T; error: string; loading: boolean };

function getResult<T, S>({ data, error, loading, name }): UseQuery<T, S> {
  return {
    data: data ? (data[name] as T) : (null as T),
    error: getGraphQLError(error),
    loading
  };
}

export default function useQuery<T, S = any>({
  query,
  name,
  variables
}: UseQueryArgs<S>): UseQuery<T, S> {
  const result = useGraphQlHooksQuery(query, variables ? { variables } : {});

  return getResult<T, S>({
    data: result.data,
    error: result.error,
    loading: result.loading,
    name
  });
}
