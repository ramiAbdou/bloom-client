import snakeCaseKeys from 'snakecase-keys';

import { take } from '@util/util';

interface BuildArgsStringArgs {
  object?: Record<string, unknown>;
  set?: Record<string, unknown>;
  where?: Record<string, unknown>;
}

const operators: string[] = ['_eq', '_lt', '_gt', '_in'];

/**
 * Returns the where query with any "_eq" operators inserted if necessary.
 *
 * To make the GraphQL abstraction easy to use, we don't require you to use
 * and "_eq" operator to signify "equals". For example, if we wanted to query
 * the a member where the urlName of the community is "colorstack", we can
 * just do:
 *  - gql.findOne(IMember, { where: { community: { urlName: "colorstack" } } })
 * as opposed to:
 *  - gql.findOne(IMember, { where: { community: { urlName: { _eq: "colorstack" } } } })
 *
 * @param where - Record of arguments to lookup entity by.
 */
const insertEqIntoWhereObject = (
  where: Record<string, unknown>
): Record<string, unknown> => {
  if (where === null) return { _eq: null };

  return Object.entries(where).reduce(
    (acc: Record<string, unknown>, [key, value]: [string, unknown]) => {
      // If the key is not an operator and the value is an object.
      const isKeyOperator: boolean = operators.includes(key);
      const isValueObject: boolean = typeof value === 'object';

      // Example: key = 'urlName' and value = 'colorstack' transforms to
      // { urlName: { _eq: "colorstack" } }
      if (!isKeyOperator && !isValueObject) {
        return { ...acc, [key]: { _eq: value } };
      }

      // Example: key = 'community' and value = { urlName: 'colorstack' }
      if (!isKeyOperator && isValueObject) {
        return {
          ...acc,
          [key]: insertEqIntoWhereObject(value as Record<string, unknown>)
        };
      }

      return { ...acc, [key]: value };
    },
    {}
  );
};

/**
 * Returns the stringified where condition in a GraphQL query.
 *
 * @param where - Record of arguments to lookup entity by.
 *
 * @example
 * // Returns 'where: { email: { $eq: "rami@onbloom.co" } }'.
 * buildWhereString({ email: 'rami@onbloom.co' })
 *
 * @example
 * // Returns 'where: { community: { url_name: { $eq: "colorstack" } } }'.
 * buildWhereString({ community: { urlName: 'colorstack' } })
 */
const buildWhereString = (where: Record<string, unknown>): string => {
  if (!where) return null;

  // The API for using "where" doesn't require us to use the _eq operator if
  // we want to signify "equals". But the GraphQL resolver requires that, so we
  // need to insert it if necessary.
  const whereWithEq: Record<string, unknown> = insertEqIntoWhereObject(where);

  const snakeCaseWhere: Record<string, unknown> = snakeCaseKeys(
    whereWithEq,
    // Don't want to convert any of the query operators.
    { exclude: operators }
  );

  // Converts the object to a string, and replaces the double quotes around
  // keys (and not the values).
  const whereString = JSON.stringify(snakeCaseWhere).replace(
    /"(\w*)":/g,
    '$1:'
  );

  return `where: ${whereString}`;
};

/**
 * Returns the argument string (defined right after the GraphQL operation). All
 * of the following affect the args string:
 *  - limit
 *  - where
 */
const buildArgsString = ({
  object,
  set,
  where
}: BuildArgsStringArgs): string => {
  if (!object && !set && !where) return '';

  const snakeCaseObject: Record<string, unknown> = snakeCaseKeys(object ?? {});

  const snakeCaseSet: Record<string, unknown> = snakeCaseKeys(set ?? {}, {
    // Don't want to convert any of the query operators.
    exclude: operators
  });

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

  const whereString: string = buildWhereString(where);

  const result: string = take([
    [set && whereString, `(_set: ${setArgsString}, ${whereString})`],
    [whereString, `(${whereString})`],
    [object, `(object: ${objectArgsString})`],
    [true, '']
  ]);

  return result;
};

export default buildArgsString;
