import camelCaseKeys from 'camelcase-keys';
import { snakeCase } from 'change-case';
import day from 'dayjs';
import pluralize from 'pluralize';

import { DocumentNode, FetchResult, gql } from '@apollo/client';
import buildArgsString from '../buildArgsString';
import buildFieldsString from '../buildFieldsString';
import { MutationResult, UpdateArgs } from '../GQL.types';

export function getUpdateMutation<T>(
  entity: new () => T,
  { data, where }: UpdateArgs<T>
): DocumentNode {
  const set = { ...data, updatedAt: day.utc().format() };

  // All of our entity types start with an I (ex: IMember, IUser, etc).
  // To get the GraphQL version of the entity name, we make the name plural
  // and convert to snake case (which automatically converts to lowercase).
  const nameWithoutI: string = entity.name.substring(1);
  const entityName: string = snakeCase(pluralize(nameWithoutI));
  const operationString: string = `update_${entityName}`;

  const argsString: string = buildArgsString({ set, where });

  // Automatically return all of the variables that we just updated.
  const fieldsString: string = buildFieldsString(Object.keys(set));

  const mutation: DocumentNode = gql`
    mutation Update${entity.name.substring(1)} {
      ${operationString} ${argsString} {
        returning {
          id
          ${fieldsString}
        }
      }
    }
  `;

  return mutation;
}

export function parseUpdateResult<T>(
  entity: new () => T,
  result: FetchResult<unknown>
): MutationResult<T> {
  // All of our entity types start with an I (ex: IMember, IUser, etc).
  // To get the GraphQL version of the entity name, we make the name plural
  // and convert to snake case (which automatically converts to lowercase).
  const nameWithoutI: string = entity.name.substring(1);
  const entityName: string = snakeCase(pluralize(nameWithoutI));
  const operationString: string = `update_${entityName}`;

  if (!result.data) {
    return {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore b/c we want to destructure very easily.
      data: {},
      error: result.errors && result.errors[0]?.message
    };
  }

  // Deeply converts all of the data from the operation to camelCase, if the
  // data exists.
  const camelCaseData: T = camelCaseKeys(
    Array.isArray(result.data[operationString])
      ? result.data[operationString][0]
      : result.data[operationString],
    { deep: true }
  );

  return {
    data: camelCaseData,
    error: result.errors && result.errors[0]?.message
  };
}
