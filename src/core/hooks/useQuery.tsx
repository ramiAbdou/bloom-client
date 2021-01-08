import { useQuery as useGraphQlHooksQuery } from 'graphql-hooks';
import { Schema } from 'normalizr';
import { useEffect } from 'react';

import { useStoreActions } from '@store/Store';
import { getGraphQLError } from '@util/util';

type UseQueryArgs<S> = {
  name: string;
  query: string;
  schema?: Schema<any>;
  variables?: S;
};

type UseQuery<T, S> = {
  data: T;
  error: string;
  loading: boolean;
};

function getResult<T, S>({ data, error, loading, name }): UseQuery<T, S> {
  return {
    data: data ? (data[name] as T) : (null as T),
    error: getGraphQLError(error),
    loading
  };
}

export default function useQuery<T = any, S = any>({
  query,
  name,
  schema,
  variables
}: UseQueryArgs<S>): UseQuery<T, S> {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const { data, error, loading } = useGraphQlHooksQuery(
    query,
    variables ? { variables } : {}
  );

  const result = getResult<T, S>({ data, error, loading, name });

  useEffect(() => {
    if (result.data && schema) mergeEntities({ data: result.data, schema });
  }, [result.data, schema]);

  return result;
}
