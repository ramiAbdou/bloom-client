import { APIError } from 'graphql-hooks';
import { normalize, Schema } from 'normalizr';

/**
 * Filter a form's options by the given search string.
 */
export const filterOptions = (
  options: string[],
  searchString: string,
  excludedValues?: string[]
): string[] => {
  const lowerCaseSearchString = searchString.toLowerCase();

  const isExcluded = (value: string) =>
    excludedValues &&
    excludedValues.some((excludedValue) => value === excludedValue);

  return options.reduce((acc: string[], value: string) => {
    return !isExcluded(value) &&
      value.toLowerCase().startsWith(lowerCaseSearchString)
      ? [...acc, value]
      : acc;
  }, []);
};

/**
 * Returns the GraphQL error from the APIError object returned after a GraphQL
 * query or mutation runs.
 *
 * There's 2 different types of error we track: either a fetch error or a
 * custom GraphQL error.
 */
export const getGraphQLError = (error: APIError): string => {
  if (!error?.graphQLErrors && !error?.fetchError) return null;

  return error.fetchError
    ? 'Failed to connect to Bloom servers.'
    : // @ts-ignore b/c the message must exist on the GraphQL error object.
      error.graphQLErrors[0]?.message;
};

/**
 * Returns a string that represents a CSS class based on the conditional
 * (and non-conditional) classes provided.
 *
 * @param arr Array of classes or conditional classes (boolean that determines
 * whether or not the class is added).
 */
export const makeClass = (
  arr:
    | (string | [any, string] | [any, string, string])[]
    | [boolean, string]
    | [boolean, string, string]
): string => {
  // If the input is a tuple (array of size 2), meaning that the first element
  // is a boolean, then we just return the string if the boolean is true.
  if (typeof arr[0] === 'boolean') {
    if (arr[0]) return arr[1] as string;
    if (arr.length === 3) return arr[2] as string;
    return '';
  }

  // If the input is an array of tuples | strings, then we reduce the array.
  return ((arr as (string | [any, string])[]).reduce(
    (
      acc: string,
      curr: string | [boolean, string] | [boolean, string, string]
    ) => {
      if (!Array.isArray(curr)) {
        if (curr) return `${acc} ${curr}`;

        // This handles the case in which we just pass in a className, and we
        // want to add it when it isn't null.
        return acc;
      }

      if (curr[0]) return `${acc} ${curr[1]}`;
      if (curr.length === 3) return `${acc} ${curr[2]}`;
      return acc;
    },
    ''
  ) as string).trimLeft();
};

/**
 * Parses the entities using the normalization function, and sets the activeId
 * of the entities if the entity is a communities or memberships.
 *
 * @param data Data to normalize.
 * @param schema Schema in which to normalize the data on.
 */
export const parseEntities = (
  data: any,
  schema: Schema<any>,
  setActiveId?: boolean
) =>
  Object.entries(normalize(data, schema).entities).reduce(
    (acc: Record<string, any>, [key, value]) => {
      const activeId = setActiveId
        ? ['communities', 'memberships', 'users'].includes(key) && {
            activeId: Object.keys(value)[0]
          }
        : {};

      return {
        ...acc,
        [key]: { ...activeId, allIds: Object.keys(value), byId: value }
      };
    },
    {}
  );

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
 * Returns the array with either the value appended to the array if the value
 * didn't exist there before, or removes it from the array if it did exist on
 * the array.
 *
 * @param arr Array in which to search for the value.
 * @param value Value to toggle.
 */
export const toggleArrayValue = (arr: any[], value: any) => {
  const index = arr.findIndex((val) => val === value);
  return index < 0
    ? [...arr, value]
    : [...arr.slice(0, index), ...arr.slice(index + 1)];
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
