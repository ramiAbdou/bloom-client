import { snakeCase } from 'change-case';
import snakeCaseKeys from 'snakecase-keys';

import { take } from '@util/util';

interface BuildArgsStringArgs {
  object?: Record<string, unknown>;
  set?: Record<string, unknown>;
  where?: Record<string, unknown>;
}

/**
 * Returns the argument string (defined right after the GraphQL operation). All
 * of the following affect the args string:
 *  - limit
 *  - where
 */
export const buildArgsString = ({
  object,
  set,
  where
}: BuildArgsStringArgs): string => {
  if (!object && !set && !where) return '';

  const formattedWhere: Record<string, unknown> = Object.entries(
    where ?? {}
  ).reduce((acc, [key, value]) => {
    if (typeof value !== 'object' && !['_eq', '_lt', '_gt'].includes(key)) {
      return { ...acc, [key]: { _eq: value } };
    }

    return { ...acc, [key]: value };
  }, {});

  const snakeCaseObject: Record<string, unknown> = snakeCaseKeys(object ?? {});

  const snakeCaseSet: Record<string, unknown> = snakeCaseKeys(set ?? {}, {
    // Don't want to convert any of the query operators.
    exclude: ['_eq', '_lt', '_gt']
  });

  const snakeCaseWhere: Record<string, unknown> = snakeCaseKeys(
    formattedWhere ?? {},
    // Don't want to convert any of the query operators.
    { exclude: ['_eq', '_lt', '_gt'] }
  );

  // Converts the object to a string, and replaces the double quotes around
  // keys (and not the values).
  const objectArgsString = JSON.stringify(snakeCaseObject).replace(
    /"(\w*)":/g,
    '$1:'
  );

  // Converts the object to a string, and replaces the double quotes around
  // keys (and not the values).
  const setArgsString = JSON.stringify(snakeCaseSet).replace(
    /"(\w*)":/g,
    '$1:'
  );

  // Converts the object to a string, and replaces the double quotes around
  // keys (and not the values).
  const whereArgsString = JSON.stringify(snakeCaseWhere).replace(
    /"(\w*)":/g,
    '$1:'
  );

  const result: string = take([
    [set && where, `(_set: ${setArgsString}, where: ${whereArgsString})`],
    [where, `(where: ${whereArgsString})`],
    [object, `(object: ${objectArgsString})`],
    [true, '']
  ]);

  return result;
};

/**
 * Returns the nested fields object that we will later use to clean up.
 *
 * @param acc - Object to build/accumulate with keys and values.
 * @param currFieldValues - Array of fields to store on the acc. The length of
 * this array represents the depth of the object.
 *
 * @example
 * // Returns { member_values: { member: { id: null } } }.
 * buildFieldsObject(['member_values', 'member', 'id'])
 */
const buildFieldsObject = (
  acc: Record<string, any> = {},
  fieldsArr: string[]
): Record<string, any> => {
  // Pick the first value off of the fields array.
  const currKey: string = fieldsArr.shift();

  return {
    ...acc,
    [currKey]: fieldsArr.length
      ? buildFieldsObject(acc[currKey], fieldsArr)
      : null
  };
};

/**
 * Returns the formatted fields string in a GraphQL nested object manner.
 *
 * @param fields - Array of dot case strings.
 *
 * @example
 * // Returns { id name members { id firstName } }
 * buildFieldsString(['id', 'name', 'members.id', 'members.firstName'])
 */
export const buildFieldsString = (fields: string[]): string => {
  const snakeCaseFields: string[] = fields.reduce(
    (allFields: string[], currField: string) => {
      // Splits the array by the '.', converts that individual string to
      // snake case, then joins the snake case strings back together.
      // Example: 'memberValues.id' -> 'member_values.id'
      const snakeCaseDotCaseField: string = currField
        .split('.')
        .map((value: string) => snakeCase(value))
        .join('.');

      return [...allFields, snakeCaseDotCaseField];
    },
    []
  );

  const result: Record<string, any> = snakeCaseFields.reduce(
    (acc: Record<string, any>, currField: string) =>
      buildFieldsObject(acc, currField.split('.')),
    {}
  );

  return (
    JSON.stringify(result)
      // Replaces all double quote, colon and null with empty string.
      .replace(/"|:|null/g, '')
      // Replaces the very first '{'.
      .replace(/^\{/, '')
      // Replaces the very last '}'.
      .replace(/\}$/, '')
  );
};

/**
 * Returns the GraphQL query string that we need to send to the Hasura GraphQL
 * server.
 */
export const buildQueryString = (): string => null;
