import camelCaseKeys from 'camelcase-keys';
import { snakeCase } from 'change-case';
import day from 'dayjs';
import { nanoid } from 'nanoid';
import pluralize from 'pluralize';

import { DocumentNode, FetchResult, gql } from '@apollo/client';
import buildArgsString from '../buildArgsString';
import buildFieldsString from '../buildFieldsString';
import { CreateArgs, MutationResult } from '../GQL.types';

export function getCreateMutation<T>(
  entity: new () => T,
  { data, fields }: CreateArgs<T>
): DocumentNode {
  const object = {
    ...data,
    createdAt: day.utc().format(),
    id: nanoid(),
    updatedAt: day.utc().format()
  };

  // All of our entity types start with an I (ex: IMember, IUser, etc).
  // To get the GraphQL version of the entity name, we make the name plural
  // and convert to snake case (which automatically converts to lowercase).
  const nameWithoutI: string = entity.name.substring(1);
  const entityName: string = snakeCase(pluralize(nameWithoutI));
  const operationString: string = `insert_one_${entityName}`;

  const argsString: string = buildArgsString({ object });
  const fieldsString: string = buildFieldsString(fields);

  const mutation: DocumentNode = gql`
    mutation Create${entity.name.substring(1)} {
      ${operationString} ${argsString} {
        id
        ${fieldsString}
      }
    }
  `;

  return mutation;
}

export function parseCreateMutationResult<T>(
  entity: new () => T,
  result: FetchResult<unknown>
): MutationResult<T> {
  // All of our entity types start with an I (ex: IMember, IUser, etc).
  // To get the GraphQL version of the entity name, we make the name plural
  // and convert to snake case (which automatically converts to lowercase).
  const nameWithoutI: string = entity.name.substring(1);
  const entityName: string = snakeCase(pluralize(nameWithoutI));
  const operationString: string = `insert_one_${entityName}`;

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
