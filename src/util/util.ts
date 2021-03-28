import { APIError } from 'graphql-hooks';

/**
 * Returns the URL with the URL params.
 *
 * @param url - URL to start with.
 * @param params - URL param object to build the URL.
 */
export const buildUrl = (
  url: string,
  params: Record<string, string>
): string => {
  return Object.entries(params).reduce(
    (acc: string, [key, value]: [string, string], i: number) => {
      const paramChar: string = i === 0 ? '?' : '&';
      return `${acc}${paramChar}${key}=${value}`;
    },
    url
  );
};

/**
 * Returns a string of classes based on the conditional flags set on each of
 * the class names.
 *
 * @param classMap Map of class names to boolean flag (whether to show or not).
 */
export const cx = (
  baseClass: string,
  classMap: Record<string, boolean>,
  customClass?: string
): string => {
  const classes = Object.entries(classMap).reduce(
    (acc: string, [className, addClassName]) => {
      if (!addClassName) return acc;
      if (acc.length) return `${acc} ${className}`;
      return className;
    },
    baseClass ?? ''
  );

  return customClass ? `${classes} ${customClass}` : classes;
};

interface GraphQLError {
  message: string;
}

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

  return (graphQLErrors[0] as GraphQLError)?.message;
};

/**
 * Opens an href link in a compatible way with all browsers.
 */
export const openHref = (href: string, openNewTab = true): void => {
  if (!href?.startsWith('http')) href = `http://${href}`;
  // If the browser is Safari, just change the location of the current
  // tab, but if not, open a new window with the URL.
  if (navigator.vendor === 'Apple Computer, Inc.' || !openNewTab) {
    window.location.href = href;
  } else window.open(href);
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
): number {
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
 * Returns the second value of the 2-tuple who's first value returns true.
 *
 * @param arr - Array of 2-tuples in which the first value gets evaluated to a
 * boolean.
 */
export const take = (arr: [any, any][]): any => {
  for (let i = 0; i < arr.length; i += 1) {
    const element: [any, any] = arr[i];
    if (element[0]) return element[1];
  }

  return null;
};
