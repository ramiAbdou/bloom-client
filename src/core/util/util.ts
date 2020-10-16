/**
 * @fileoverview Utility: General
 * @author Rami Abdou
 */

import axios, { AxiosRequestConfig } from 'axios';
import {
  mutation as mutationBuilder,
  query as queryBuilder
} from 'gql-query-builder';
import GQLOptions from 'gql-query-builder/build/IQueryBuilderOptions';
import moment from 'moment-timezone';

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

  const isExcluded = (value) =>
    excludedValues &&
    excludedValues.some((excludedValue) => value === excludedValue);

  return options.reduce((acc: string[], value: string) => {
    return !isExcluded(value) &&
      value.toLowerCase().startsWith(lowerCaseSearchString)
      ? [...acc, value]
      : acc;
  }, []);
};

axios.defaults.withCredentials = true;

const config: AxiosRequestConfig = {
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  method: 'POST',
  url: `${APP.SERVER_URL}/graphql`,
  withCredentials: true
};

export const query = async (data: GQLOptions) => {
  const options = { ...config, data: queryBuilder(data) };
  return (await axios(options)).data.data[data.operation];
};

export const mutation = async (data: GQLOptions) => {
  const options = { ...config, data: mutationBuilder(data) };
  return (await axios(options)).data.data[data.operation];
};

/**
 * Returns the estimated timezone of the user.
 */
export const timezone = (): string => moment.tz(moment.tz.guess()).zoneAbbr();
