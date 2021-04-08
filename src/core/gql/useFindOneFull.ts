import camelCaseKeys from 'camelcase-keys';
import { snakeCase } from 'change-case';
import pluralize from 'pluralize';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import buildArgsString from './buildArgsString';
import buildFieldsString from './buildFieldsString';
import { FindOneArgs, QueryResult } from './gql.types';

function useFindOneFull<T>(
  entity: new () => T,
  { fields, skip, where }: FindOneArgs<T>
): QueryResult<T> {
  const nameWithoutI: string = entity.name.substring(1);
  const entityName: string = snakeCase(pluralize(nameWithoutI));

  const argsString: string = buildArgsString({ where });

  const fieldsString: string = buildFieldsString([
    ...(fields ?? []),
    'id'
  ] as string[]);

  const query: DocumentNode = gql`
      query FindOne${nameWithoutI} {
        ${entityName} ${argsString} {
          ${fieldsString}
        }
      }
    `;

  const result = useQuery(query, { skip });

  if (!result.data) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore b/c we want to destructure very easily.
    return { data: {}, error: result.error?.message, loading: result.loading };
  }

  // Deeply converts all of the data from the operation to camelCase, if the
  // data exists.
  const camelCaseData: T = camelCaseKeys(
    Array.isArray(result.data[entityName])
      ? result.data[entityName][0]
      : result.data[entityName],
    { deep: true }
  );

  return {
    data: camelCaseData,
    error: result.error?.message,
    loading: result.loading
  };
}

export default useFindOneFull;
