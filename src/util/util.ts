import day from 'dayjs';

import { ApolloError } from '@apollo/client';
import { QuestionCategory } from '@util/constants';
import { IMember, IMemberValue, IQuestion } from '@util/constants.entities';
import { TableConstraint } from '@util/constants.errors';

/**
 * Returns the URL with the URL params.
 *
 * @param url - URL to start with.
 * @param params - URL param object to build the URL.
 */
export const buildUrl = (url: string, params: Record<string, string>): string =>
  Object.entries(params).reduce(
    (acc: string, [key, value]: [string, string], i: number) => {
      const paramChar: string = i === 0 ? '?' : '&';
      return `${acc}${paramChar}${key}=${value}`;
    },
    url
  );

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

type GraphQLErrorContext = { email: string };

export const getGraphQLError = (
  error: ApolloError,
  context?: GraphQLErrorContext
): string => {
  if (!error) return null;

  const { message, networkError } = error;
  const { email } = context ?? {};

  if (networkError) {
    return 'Failed to connect to Bloom servers.';
  }

  if (
    message.includes(TableConstraint.MEMBERS_COMMUNITY_ID_EMAIL_UNIQUE) &&
    email
  ) {
    return `The email (${email}) already exists in this community.`;
  }

  if (
    message.includes(TableConstraint.MEMBERS_COMMUNITY_ID_EMAIL_UNIQUE) &&
    !email
  ) {
    return `One of these emails already exists in this community.`;
  }

  return message;
};

/**
 * Returns the current UTC timestamp as a string to the millisecond.
 *
 * @example
 * // Returns '2020-08-31T23:17:20Z'.
 * now()
 */
export const now = (): string => day.utc().format();

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

interface ResolveMemberValueArgs {
  member: IMember;
  memberValue: IMemberValue;
  question: IQuestion;
}

export const resolveMemberValue = ({
  member,
  memberValue,
  question
}: ResolveMemberValueArgs): unknown => {
  const { bio, email, firstName, joinedAt, lastName, pictureUrl } = member;

  const {
    facebookUrl,
    instagramUrl,
    linkedInUrl,
    twitterUrl
  } = member.memberSocials;

  const { category } = question;

  if (category === QuestionCategory.BIO) return bio;
  if (category === QuestionCategory.DUES_STATUS) return true;
  if (category === QuestionCategory.EMAIL) return email;
  if (category === QuestionCategory.FACEBOOK_URL) return facebookUrl;
  if (category === QuestionCategory.FIRST_NAME) return firstName;
  if (category === QuestionCategory.INSTAGRAM_URL) return instagramUrl;
  if (category === QuestionCategory.JOINED_AT) return joinedAt;
  if (category === QuestionCategory.LAST_NAME) return lastName;
  if (category === QuestionCategory.LINKED_IN_URL) return linkedInUrl;
  if (category === QuestionCategory.PROFILE_PICTURE) return pictureUrl;
  if (category === QuestionCategory.TWITTER_URL) return twitterUrl;

  if (category === QuestionCategory.MEMBER_TYPE) {
    return member.memberType?.name;
  }

  if (category === QuestionCategory.EVENTS_ATTENDED) {
    return member.eventAttendees?.length ?? 0;
  }

  return memberValue?.value;
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

export function toArray<T>(value: T | T[]): T[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return [value];
}

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
export const updateDocumentColors = (color: string): void => {
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
