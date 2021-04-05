import camelCaseKeys from 'camelcase-keys';
import { snakeCase } from 'change-case';
import { ActionCreator } from 'easy-peasy';
import { useEffect } from 'react';

import { DocumentNode, gql, useQuery as useApolloQuery } from '@apollo/client';
import { useStoreActions } from '@store/Store';
import { MergeEntitiesArgs } from '../db/db.types';
import buildArgsString from './buildArgsString';
import buildFieldsString from './buildFieldsString';
import { QueryArgs, QueryResult } from './gql.types';

function useQuery<T>({
  fields,
  operation,
  schema,
  where
}: QueryArgs): QueryResult<T> {
  const mergeEntities: ActionCreator<MergeEntitiesArgs> = useStoreActions(
    ({ db }) => db.mergeEntities
  );

  const argsString: string = buildArgsString({ where });
  const fieldsString: string = buildFieldsString(fields);
  const operationString: string = snakeCase(operation);

  const query: DocumentNode = gql`
      query {
        ${operationString} ${argsString} {
          ${fieldsString}
        }
      }
    `;

  const result = useApolloQuery(query);

  // Deeply converts all of the data from the operation to camelCase, if the
  // data exists.
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
