import camelCaseKeys from 'camelcase-keys';
import { snakeCase } from 'change-case';
import pluralize from 'pluralize';

import { ApolloQueryResult, DocumentNode, gql } from '@apollo/client';
import { FindOneArgs, QueryResult } from '@gql/gql.types';
import buildArgsString from './buildArgsString';
import buildFieldsString from './buildFieldsString';

export function getFindQuery<T>(
  entity: new () => T,
  { fields, where }: FindOneArgs<T>
): DocumentNode {
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

  return query;
}

export function parseFindQueryResult<T>(
  entity: new () => T,
  result: ApolloQueryResult<unknown>
): QueryResult<T[]> {
  const nameWithoutI: string = entity.name.substring(1);
  const entityName: string = snakeCase(pluralize(nameWithoutI));

  if (!result.data) {
    return {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore b/c we want to destructure very easily.
      data: [],
      error: result.error?.message,
      loading: result.loading
    };
  }

  // Deeply converts all of the data from the operation to camelCase, if the
  // data exists.
  const camelCaseData: T[] = camelCaseKeys(result.data[entityName], {
    deep: true
  });

  return {
    data: camelCaseData,
    error: result.error?.message,
    loading: result.loading
  };
}
