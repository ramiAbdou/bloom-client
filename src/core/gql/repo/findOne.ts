import { ApolloQueryResult, DocumentNode, gql } from '@apollo/client';
import buildArgsString from '../buildArgsString';
import buildFieldsString from '../buildFieldsString';
import buildOperationString from '../buildOperationString';
import { FindOneArgs, GQLOperation, QueryResult } from '../GQL.types';

export function getFindOneQuery<T>(
  entity: new () => T,
  { fields, where }: FindOneArgs<T>
): DocumentNode {
  const operationString: string = buildOperationString(
    entity,
    GQLOperation.FIND_ONE
  );

  const argsString: string = buildArgsString({ where });

  const fieldsString: string = buildFieldsString([
    ...(fields ?? []),
    'id'
  ] as string[]);

  const query: DocumentNode = gql`
      query FindOne${entity.name.substring(1)} {
        ${operationString} ${argsString} {
          ${fieldsString}
        }
      }
    `;

  return query;
}

export function parseFindOneQueryResult<T>(
  entity: new () => T,
  result: ApolloQueryResult<unknown>
): QueryResult<T> {
  const operationString: string = buildOperationString(
    entity,
    GQLOperation.FIND_ONE
  );

  if (!result.data) {
    return {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore b/c we want to destructure very easily.
      data: {},
      error: result.error?.message,
      loading: result.loading
    };
  }

  return {
    data: Array.isArray(result.data[operationString])
      ? result.data[operationString][0]
      : result.data[operationString],
    error: result.error?.message,
    loading: result.loading
  };
}
