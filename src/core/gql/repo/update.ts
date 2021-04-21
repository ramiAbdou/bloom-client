import day from 'dayjs';

import { DocumentNode, FetchResult, gql } from '@apollo/client';
import buildArgsString from '../buildArgsString';
import buildFieldsString from '../buildFieldsString';
import buildOperationString from '../buildOperationString';
import { GQLOperation, MutationResult, UpdateArgs } from '../GQL.types';

export function getUpdateMutation<T>(
  entity: new () => T,
  { data, where }: UpdateArgs<T>
): DocumentNode {
  const operationString: string = buildOperationString(
    entity,
    GQLOperation.UPDATE
  );

  const set = { ...data, updatedAt: day.utc().format() };
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
  const operationString: string = buildOperationString(
    entity,
    GQLOperation.UPDATE
  );

  if (!result.data) {
    return {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore b/c we want to destructure very easily.
      data: {},
      error: result.errors && result.errors[0]?.message
    };
  }
  return {
    data: Array.isArray(result.data[operationString])
      ? result.data[operationString][0]
      : result.data[operationString],
    error: result.errors && result.errors[0]?.message
  };
}
export function parseUpdateManyResult<T>(
  entity: new () => T,
  result: FetchResult<unknown>
): MutationResult<T[]> {
  const operationString: string = buildOperationString(
    entity,
    GQLOperation.UPDATE
  );

  if (!result.data) {
    return {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore b/c we want to destructure very easily.
      data: {},
      error: result.errors && result.errors[0]?.message
    };
  }

  return {
    data: result.data[operationString],
    error: result.errors && result.errors[0]?.message
  };
}
