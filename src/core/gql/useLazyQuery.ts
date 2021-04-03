import camelCaseKeys from 'camelcase-keys';
import { snakeCase } from 'change-case';
import { ActionCreator } from 'easy-peasy';
import { useEffect } from 'react';

import {
  DocumentNode,
  gql,
  useLazyQuery as useApolloLazyQuery
} from '@apollo/client';
import { QueryArgs, QueryResult } from '@gql/gql.types';
import { useStoreActions } from '@store/Store';
import { MergeEntitiesArgs } from '../store/Db/Db.types';
import { buildArgsString, buildFieldsString } from './gql.util';

function useLazyQuery<T>({
  fields,
  operation,
  queryName: queryNameString,
  schema,
  where
}: QueryArgs): [any, QueryResult<T>] {
  const mergeEntities: ActionCreator<MergeEntitiesArgs> = useStoreActions(
    ({ db }) => db.mergeEntities
  );

  const argsString: string = buildArgsString({ where });
  const fieldsString: string = buildFieldsString(fields);
  const snakeOperation: string = snakeCase(operation);

  const query: DocumentNode = gql`
      query ${queryNameString} {
        ${snakeOperation} ${argsString} ${fieldsString}
      }
    `;

  const [queryFn, result] = useApolloLazyQuery(query);

  // Deeply converts all of the data from the operation to camelCase, if the
  // data exists.
  const camelCaseData: T = camelCaseKeys(
    result.data ? result.data[snakeOperation] : null,
    { deep: true }
  );

  useEffect(() => {
    if (camelCaseData) mergeEntities({ data: camelCaseData, schema });
  }, [camelCaseData, schema]);

  return [
    queryFn,
    { ...result, data: camelCaseData, error: result.error?.message }
  ];
}

export default useLazyQuery;
