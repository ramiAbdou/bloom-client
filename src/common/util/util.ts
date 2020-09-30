/**
 * @fileoverview Utility: General
 * @author Rami Abdou
 */

import moment from 'moment-timezone';

import { FormOption } from '@constants';

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
  searchString: string
): FormOption[] => {
  const lowerCaseSearchString = searchString.toLowerCase();

  return options.reduce((acc: FormOption[], value: FormOption) => {
    return value.value.toLowerCase().startsWith(lowerCaseSearchString)
      ? [...acc, value]
      : acc;
  }, []);
};

/**
 * Returns the estimated timezone of the user.
 */
export const timezone = (): string => moment.tz(moment.tz.guess()).zoneAbbr();
