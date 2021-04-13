import camelCaseKeys from 'camelcase-keys';
import day from 'dayjs';
import { nanoid } from 'nanoid';

import { DocumentNode, FetchResult, gql } from '@apollo/client';
import buildArgsString from '../buildArgsString';
import buildFieldsString from '../buildFieldsString';
import buildOperationString from '../buildOperationString';
import { CreateArgs, GQLOperation, MutationResult } from '../GQL.types';

export function getCreateMutation<T>(
  entity: new () => T,
  { data, fields }: CreateArgs<T>
): DocumentNode {
  const operationString: string = buildOperationString(
    entity,
    GQLOperation.CREATE
  );

  const object = {
    ...data,
    createdAt: day.utc().format(),
    id: nanoid(),
    updatedAt: day.utc().format()
  };

  const argsString: string = buildArgsString({ object });

  const fieldsString: string = buildFieldsString([
    ...(fields ?? []),
    'id'
  ] as string[]);

  const mutation: DocumentNode = gql`
    mutation Create${entity.name.substring(1)} {
      ${operationString} ${argsString} {
        ${fieldsString}
      }
    }
  `;

  console.log(`
  mutation Create${entity.name.substring(1)} {
    ${operationString} ${argsString} {
      ${fieldsString}
    }
  }
`);

  return mutation;
}

export function parseCreateMutationResult<T>(
  entity: new () => T,
  result: FetchResult<unknown>
): MutationResult<T> {
  const operationString: string = buildOperationString(
    entity,
    GQLOperation.CREATE
  );

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
