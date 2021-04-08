import camelCaseKeys from 'camelcase-keys';
import { snakeCase } from 'change-case';
import pluralize from 'pluralize';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import buildArgsString from './buildArgsString';
import buildFieldsString from './buildFieldsString';
import { FindOneArgs, QueryResult } from './gql.types';

function useFindOneFull<T>(
  entity: new () => T,
  { fields, where }: FindOneArgs<T>
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

  const result = useQuery(query);

  // Deeply converts all of the data from the operation to camelCase, if the
  // data exists.
  const camelCaseData: T[] = camelCaseKeys(
    result.data ? result.data[entityName] : null,
    { deep: true }
  );

  const record: T = camelCaseData?.length ? camelCaseData[0] : null;

  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore b/c we want to be able to destructure without null issues.
    data: record ?? {},
    error: result.error?.message,
    loading: result.loading
  };
}

export default useFindOneFull;
