import { APIError } from 'graphql-hooks';

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
 * Returns the hue from an RGB 3-tuple. Only a helper function for the next
 * update document colors function.
 */
const getHueFromRGB = ([r, g, b]: number[]): number => {
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  if (max === min) return 0;

  let hue = (max + min) / 2;
  const diff = max - min;

  if (max === r) hue = (g - b) / diff;
  if (max === g) hue = (b - r) / diff + 2;
  if (max === b) hue = (r - g) / diff + 4;

  hue *= 60;

  return hue < 0 ? hue + 360 : Math.round(hue);
};

/**
 * Updates the CSS global variables with the appropriate primary colors as well
 * as 6 gray values.
 *
 * @param color Hexadecimal representation of the color including the #.
 * @see https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
 */
export const updateDocumentColors = (color: string) => {
  // If the document's primary color is up to date, return early.
  const { style } = document.documentElement;
  if (style.getPropertyValue('--primary') === color) return;

  const RGB = color
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (_, r, g, b) => `#${r}${r}${g}${g}${b}${b}`
    )
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16));

  const hue = getHueFromRGB(RGB);

  style.setProperty('--primary', color);
  style.setProperty('--primary-hex', `${RGB[0]}, ${RGB[1]}, ${RGB[2]}`);
  style.setProperty('--primary-hue', hue.toString());
  style.setProperty('--gray-1', `hsl(${hue}, 5%, 20%)`);
  style.setProperty('--gray-2', `hsl(${hue}, 5%, 31%)`);
  style.setProperty('--gray-3', `hsl(${hue}, 5%, 51%)`);
  style.setProperty('--gray-4', `hsl(${hue}, 5%, 74%)`);
  style.setProperty('--gray-5', `hsl(${hue}, 5%, 88%)`);
  style.setProperty('--gray-6', `hsl(${hue}, 5%, 96%)`);
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
