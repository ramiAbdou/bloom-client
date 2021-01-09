import { useQuery as useGraphQlHooksQuery } from 'graphql-hooks';
import { Schema } from 'normalizr';
import { useEffect } from 'react';

import { useStoreActions } from '@store/Store';
import { getGraphQLError } from '@util/util';

type UseQueryArgs<T, S> = {
  format?: (data: T) => any;
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

function useQuery<T = any, S = any>({
  format,
  query,
  name,
  schema,
  variables
}: UseQueryArgs<T, S>): UseQuery<T, S> {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const { data, error, loading } = useGraphQlHooksQuery(
    query,
    variables ? { variables } : {}
  );

  const result = {
    data: data ? (data[name] as T) : (null as T),
    error: getGraphQLError(error),
    loading
  };

  useEffect(() => {
    if (result.data && schema) {
      const formattedData = format ? format(result.data) : result.data;
      mergeEntities({ data: formattedData, schema });
    }
  }, [result.data, schema]);

  return result;
}

export default useQuery;
