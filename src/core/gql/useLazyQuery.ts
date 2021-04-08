import camelCaseKeys from 'camelcase-keys';
import { snakeCase } from 'change-case';

import {
  DocumentNode,
  gql,
  useLazyQuery as useApolloLazyQuery
} from '@apollo/client';
import { QueryArgs, QueryResult } from '@gql/gql.types';
import buildArgsString from './buildArgsString';
import buildFieldsString from './buildFieldsString';

function useLazyQuery<T>({
  fields,
  operation,
  where
}: QueryArgs): [any, QueryResult<T>] {
  const argsString: string = buildArgsString({ where });
  const fieldsString: string = buildFieldsString(fields);
  const snakeOperation: string = snakeCase(operation);

  const query: DocumentNode = gql`
      query {
        ${snakeOperation} ${argsString} {
          ${fieldsString}
        }
      }
    `;

  const [queryFn, result] = useApolloLazyQuery(query);

  // Deeply converts all of the data from the operation to camelCase, if the
  // data exists.
  const camelCaseData: T = camelCaseKeys(
    result.data ? result.data[snakeOperation] : null,
    { deep: true }
  );

  return [
    queryFn,
    { ...result, data: camelCaseData, error: result.error?.message }
  ];
}

export default useLazyQuery;
