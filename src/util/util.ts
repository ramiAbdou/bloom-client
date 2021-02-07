import { APIError } from 'graphql-hooks';

/**
 * Returns a string of classes based on the conditional flags set on each of
 * the class names.
 *
 * @param classMap Map of class names to boolean flag (whether to show or not).
 */
export const cx = (
  baseClass: string,
  classMap: Record<string, any>
): string => {
  return Object.entries(classMap).reduce(
    (acc: string, [className, addClassName]) => {
      if (!addClassName) return acc;
      if (acc.length) return `${acc} ${className}`;
      return className;
    },
    baseClass ?? ''
  );
};

/**
 * Returns the GraphQL error from the APIError object returned after a GraphQL
 * query or mutation runs.
 *
 * There's 2 different types of error we track: either a fetch error or a
 * custom GraphQL error.
 */
export const getGraphQLError = (error: APIError): string => {
  if (!error) return null;

  const { fetchError, graphQLErrors, httpError } = error;

  if (fetchError) return 'Failed to connect to Bloom servers.';
  if (httpError) return 'Request failed.';

  // @ts-ignore b/c the message must exist on the GraphQL error object.
  return graphQLErrors[0]?.message;
};

/**
 * Returns the array in descending order based on the createdAt.
 *
 * @example sortByDescendingCreatedAt({ createdAt: 1 }, { createdAt: 2 }) => 1
 * @example sortByDescendingCreatedAt({ createdAt: 10 }, { createdAt: 1 }) => -1
 */
export function sortObjects<T>(
  a: T,
  b: T,
  keys: keyof T | (keyof T)[],
  direction: 'ASC' | 'DESC' = 'DESC'
) {
  const order = direction === 'ASC' ? 1 : -1;

  if (!Array.isArray(keys)) {
    if (Number(a[keys] > b[keys]) || (a && !b)) return order;
    if (Number(a[keys] < b[keys]) || (b && !a)) return order * -1;
    return 0;
  }

  while (keys?.length) {
    const currentKey = keys[0];
    if (
      Number(a[currentKey] > b[currentKey]) ||
      (a[currentKey] && !b[currentKey])
    ) {
      return order;
    }
    if (
      Number(a[currentKey] < b[currentKey]) ||
      (b[currentKey] && !a[currentKey])
    ) {
      return order * -1;
    }
    keys.shift();
  }

  return 0;
}

/**
 * Returns the first value in which the condition is true.
 */
export const takeFirst = (arr: ([boolean, any] | any)[]) => {
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (!Array.isArray(element) && !!element) return element;
    if (element[0]) return element[1];
  }

  return null;
};
