import camelCaseKeys from 'camelcase-keys';
import { snakeCase } from 'change-case';
import { useEffect } from 'react';

import { DocumentNode, gql, useQuery as useApolloQuery } from '@apollo/client';
import { useStoreActions } from '@store/Store';
import { QueryArgs, QueryResult } from './gql.types';
import { buildArgsString, buildFieldsString } from './gql.util';

const buildVarsString = (variables: any): string => {
  if (!variables) return '';

  const a = Object.entries(variables).reduce(
    (acc: string, [key, value]: [any, any], i) => {
      if (i === 0) {
        return `${acc}$${key}: ${value.type}`;
      }

      return `, ${acc}$${key}: ${value.type}`;
    },
    ''
  );

  return a ? `(${a})` : a;
};

function useQuery<T = any>({
  fields,
  operation,
  queryName: queryString,
  schema,
  skip,
  variables,
  where
}: QueryArgs): QueryResult<T> {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const argsString: string = buildArgsString({ where });
  const varsString: string = buildVarsString(variables);

  const snakeOperation: string = snakeCase(operation);

  const query: DocumentNode = gql`
      query ${queryString}${varsString} {
        ${snakeOperation}${argsString} ${buildFieldsString(fields)}
      }
    `;

  const result = useApolloQuery(
    query,
    variables
      ? {
          skip,
          variables: Object.entries(variables).reduce((acc, [key, value]) => {
            return { ...acc, [key]: value.value };
          }, {})
        }
      : { skip }
  );

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
