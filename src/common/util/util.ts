/**
 * @fileoverview Utility: General
 * @author Rami Abdou
 */

import moment from 'moment-timezone';

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
 * Returns a list of filtered options based on the search string.
 * Precondition: The options array is already sorted.
 *
 * @param options Array of options to filter.
 * @param searchString Query string to filter based on.
 */
export const filterOptions = (
  options: string[],
  searchString: string
): string[] => {
  const lowerCaseSearchString = searchString.toLowerCase();

  return options.reduce((acc: string[], value: string) => {
    return value.toLowerCase().startsWith(lowerCaseSearchString)
      ? [...acc, value]
      : acc;
  }, []);
};

/**
 * Returns the estimated timezone of the user.
 */
export const timezone = (): string => moment.tz(moment.tz.guess()).zoneAbbr();
