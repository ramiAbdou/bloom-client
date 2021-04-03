import camelCaseKeys from 'camelcase-keys';
import { snakeCase } from 'change-case';
import { useEffect } from 'react';

import { DocumentNode, gql, useQuery as useApolloQuery } from '@apollo/client';
import { useStoreActions } from '@store/Store';
import { QueryArgs, QueryResult } from './gql.types';
import { buildArgsString, buildFieldsString } from './gql.util';

function useQuery<T = any>({
  fields,
  operation,
  queryName,
  schema,
  skip,
  where
}: QueryArgs): QueryResult<T> {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const argsString: string = buildArgsString({ where });

  const snakeOperation: string = snakeCase(operation);

  const query: DocumentNode = gql`
      query ${queryName} {
        ${snakeOperation} ${argsString} ${buildFieldsString(fields)}
      }
    `;

  const result = useApolloQuery(query, { skip });

  const camelCaseData: T = camelCaseKeys(
    result.data ? result.data[snakeOperation] : null,
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
