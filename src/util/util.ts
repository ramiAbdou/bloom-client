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

/**
 * Open-source method for generating a uuid without using a 3rd party package.
 *
 * @see https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
 */
export const uuid = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0,
      // eslint-disable-next-line no-bitwise
      v = c === 'x' ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });
