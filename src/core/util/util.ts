/**
 * @fileoverview Utility: General
 * @author Rami Abdou
 */

/* eslint-disable no-bitwise */

import axios, { AxiosRequestConfig } from 'axios';
import {
  mutation as mutationBuilder,
  query as queryBuilder
} from 'gql-query-builder';
import GQLOptions from 'gql-query-builder/build/IQueryBuilderOptions';
import { APIError } from 'graphql-hooks';
import moment from 'moment-timezone';
import { normalize, Schema } from 'normalizr';

import { APP } from '@constants';

/**
 * Returns the className with the modifier if the shouldAdd evaluates to true,
 * or just returns the className if false.
 */
export const addModifier = (
  className: string,
  shouldAdd: boolean,
  modifier = 'active'
) => (shouldAdd ? `${className}--${modifier}` : className);

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

export const getRGBFromHex = (hex: string): number[] =>
  hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`
    )
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16));

export const getHueFromRGB = ([r, g, b]: number[]): number => {
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

export const getGraphQLError = (error: APIError) => {
  if (!error?.graphQLErrors && !error?.fetchError) return null;

  return error.fetchError
    ? 'Failed to connect to Bloom servers.'
    : // @ts-ignore b/c the message must exist on the GraphQL error object.
      error.graphQLErrors[0]?.message;
};

axios.defaults.withCredentials = true;

const config: AxiosRequestConfig = {
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  method: 'POST',
  url: `${APP.SERVER_URL}/graphql`,
  withCredentials: true
};

export const parseEntities = (data: any, schema: Schema<any>) =>
  Object.entries(normalize(data, schema).entities).reduce(
    (acc: Record<string, any>, [key, value]) => {
      return {
        ...acc,
        [key]: {
          activeId: ['communities', 'memberships'].includes(key)
            ? Object.keys(value)[0]
            : null,
          allIds: Object.keys(value),
          byId: value
        }
      };
    },
    {}
  );

export const query = async (data: GQLOptions) => {
  const options = { ...config, data: queryBuilder(data) };
  return (await axios(options)).data.data[data.operation];
};

export const mutation = async (data: GQLOptions) => {
  const options = { ...config, data: mutationBuilder(data) };
  return (await axios(options)).data.data[data.operation];
};

export const timezone = (): string => moment.tz(moment.tz.guess()).zoneAbbr();

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
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
