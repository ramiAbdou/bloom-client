import { useMutation as useGraphQlHooksMutation } from 'graphql-hooks';

import { getGraphQLError } from '@util/util';

type UseMutationArgs<S> = { name: string; query: string; variables?: S };
type UseMutationResult<T> = { data: T; error: string; loading: boolean };
type UseMutation<T, S> = [
  (variables?: S) => Promise<UseMutationResult<T>>,
  UseMutationResult<T>
];

function getResult<T>({ data, error, loading, name }): UseMutationResult<T> {
  return {
    data: data ? data[name] : (null as T),
    error: getGraphQLError(error),
    loading
  };
}

export default function useMutation<T, S>({
  query,
  name,
  variables: initialVariables
}: UseMutationArgs<S>): UseMutation<T, S> {
  const [mutationFn, result] = useGraphQlHooksMutation(
    query,
    initialVariables ? { variables: initialVariables } : {}
  );

  const typedMutationFn = async (variables?: S) => {
    // @ts-ignore until we figure out the correc type.
    const { data, error, loading } = await mutationFn({
      variables: variables ?? initialVariables
    });

    return getResult<T>({ data, error, loading, name });
  };

  return [
    typedMutationFn,
    getResult<T>({
      data: result.data,
      error: result.error,
      loading: result.loading,
      name
    })
  ];
}
