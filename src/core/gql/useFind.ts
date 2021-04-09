import camelCaseKeys from 'camelcase-keys';
import { snakeCase } from 'change-case';
import pluralize from 'pluralize';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import buildArgsString from './buildArgsString';
import buildFieldsString from './buildFieldsString';
import { FindOneArgs } from './gql.types';

function useFind<T>(
  entity: new () => T,
  { fields, skip, where }: FindOneArgs<T>
): T[] {
  // All of our entity types start with an I (ex: IMember, IUser, etc).
  const nameWithoutI: string = entity.name.substring(1);

  // To get the GraphQL version of the entity name, we make the name plural
  // and convert to snake case (which automatically converts to lowercase).
  const entityName: string = snakeCase(pluralize(nameWithoutI));

  const argsString: string = buildArgsString({ where });

  const fieldsString: string = buildFieldsString([
    ...(fields ?? []),
    'id'
  ] as string[]);

  const query: DocumentNode = gql`
      query Find${nameWithoutI} {
        ${entityName} ${argsString} {
          ${fieldsString}
        }
      }
    `;

  const result = useQuery(query, { skip });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore b/c we want to destructure very easily.
  if (!result.data) return [];

  // Deeply converts all of the data from the operation to camelCase, if the
  // data exists.
  const camelCaseData: T[] = camelCaseKeys(result.data[entityName], {
    deep: true
  });

  return camelCaseData;
}

export default useFind;
