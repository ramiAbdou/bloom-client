import camelCaseKeys from 'camelcase-keys';
import { snakeCase } from 'change-case';
import pluralize from 'pluralize';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import buildArgsString from './buildArgsString';
import buildFieldsString from './buildFieldsString';
import { FindOneArgs } from './gql.types';

function useFindOne<T>(
  entity: new () => T,
  { fields, where }: FindOneArgs<T>
): T {
  const nameWithoutI: string = entity.name.substring(1);
  const entityName: string = snakeCase(pluralize(nameWithoutI));

  const argsString: string = buildArgsString({ where });
  const fieldsString: string = buildFieldsString(fields as string[]);

  const query: DocumentNode = gql`
      query FindOne${nameWithoutI} {
        ${entityName} ${argsString} {
          id
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore b/c we want to destructure very easily.
  return record ?? {};
}

export default useFindOne;