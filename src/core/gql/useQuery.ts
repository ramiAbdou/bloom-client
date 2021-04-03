import camelCaseKeys from 'camelcase-keys';
import { snakeCase } from 'change-case';
import { ActionCreator } from 'easy-peasy';
import { useEffect } from 'react';

import { DocumentNode, gql, useQuery as useApolloQuery } from '@apollo/client';
import { useStoreActions } from '@store/Store';
import { MergeEntitiesArgs } from '../store/Db/Db.types';
import { QueryArgs, QueryResult } from './gql.types';
import { buildArgsString, buildFieldsString } from './gql.util';

function useQuery<T = unknown>({
  fields,
  operation,
  queryName: queryNameString,
  schema,
  skip,
  where
}: QueryArgs): QueryResult<T> {
  const mergeEntities: ActionCreator<MergeEntitiesArgs> = useStoreActions(
    ({ db }) => db.mergeEntities
  );

  const argsString: string = buildArgsString({ where });
  const operationString: string = snakeCase(operation);

  const query: DocumentNode = gql`
      query ${queryNameString} {
        ${operationString} ${argsString} ${buildFieldsString(fields)}
      }
    `;

  const result = useApolloQuery(query, { skip });

  const camelCaseData: T = camelCaseKeys(
    result.data ? result.data[operationString] : null,
    { deep: true }
  );

  useEffect(() => {
    if (camelCaseData && schema) mergeEntities({ data: camelCaseData, schema });
  }, [camelCaseData, schema]);

  return {
    called: result.called,
    data: camelCaseData,
    error: result.error?.message,
    loading: result.loading
  };
}

export default useQuery;
