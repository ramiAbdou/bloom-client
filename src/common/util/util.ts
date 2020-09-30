/**
 * @fileoverview Utility: General
 * @author Rami Abdou
 */

import axios, { AxiosRequestConfig } from 'axios';
import moment from 'moment-timezone';

import { APP, FormOption } from '@constants';

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
  options: FormOption[],
  searchString: string,
  excludedValues?: FormOption[]
): FormOption[] => {
  const lowerCaseSearchString = searchString.toLowerCase();

  const isExcluded = (value: FormOption) =>
    excludedValues &&
    excludedValues.some((excludedValue) => value.value === excludedValue.value);

  return options.reduce((acc: FormOption[], value: FormOption) => {
    return !isExcluded(value) &&
      value.value.toLowerCase().startsWith(lowerCaseSearchString)
      ? [...acc, value]
      : acc;
  }, []);
};

export const gql = async (data: any) => {
  const options: AxiosRequestConfig = {
    data,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
    url: `${APP.SERVER_URL}/graphql`
  };

  return (await axios(options)).data.data;
};

/**
 * Returns the estimated timezone of the user.
 */
export const timezone = (): string => moment.tz(moment.tz.guess()).zoneAbbr();
