import camelCaseKeys from 'camelcase-keys';
import { snakeCase } from 'change-case';
import { useEffect } from 'react';

import {
  DocumentNode,
  gql,
  useLazyQuery as useApolloLazyQuery
} from '@apollo/client';
import { QueryArgs, QueryResult } from '@gql/gql.types';
import { useStoreActions } from '@store/Store';
import { buildArgsString, buildFieldsString } from './gql.util';

function useLazyQuery<T = any>({
  fields,
  operation,
  queryName,
  schema,
  where
}: QueryArgs): [any, QueryResult<T>] {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const argsString: string = buildArgsString({ where });

  const snakeOperation: string = snakeCase(operation);

  const query: DocumentNode = gql`
      query ${queryName} {
        ${snakeOperation} ${argsString} ${buildFieldsString(fields)}
      }
    `;

  const [queryFn, result] = useApolloLazyQuery(query);

  const camelCaseData: T = camelCaseKeys(
    result.data ? result.data[snakeOperation] : null,
    { deep: true }
  );

  useEffect(() => {
    if (camelCaseData && schema) mergeEntities({ data: camelCaseData, schema });
  }, [camelCaseData, schema]);

  return [
    queryFn,
    { ...result, data: camelCaseData, error: result.error?.message }
  ];
}

export default useLazyQuery;
