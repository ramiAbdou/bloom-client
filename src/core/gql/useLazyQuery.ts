import camelCaseKeys from 'camelcase-keys';
import { snakeCase } from 'change-case';
import { Schema } from 'normalizr';
import { useEffect } from 'react';

import {
  DocumentNode,
  gql,
  useLazyQuery as useApolloLazyQuery
} from '@apollo/client';
import { QueryResult } from '@gql/gql.types';
import { useStoreActions } from '@store/Store';
import { buildFieldsString } from './gql.util';

interface GraphQLVariableArgs {
  type: 'String!';
  value: string;
}

interface UseHasuraQueryArgs {
  fields: string[];
  variables: Record<string, GraphQLVariableArgs>;
  operation: string;
  queryName: string;
  schema?: Schema;
  where?: any;
}

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

const buildArgsString = (where): string => {
  if (!where) return '';

  const a = `where: ${JSON.stringify(where).replace(/"/g, '')}`;

  return a ? `(${a})` : a;
};

function useLazyQuery<T = any>({
  fields,
  operation,
  queryName: queryString,
  schema,
  variables: initialVariables,
  where
}: UseHasuraQueryArgs): [any, QueryResult<T>] {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const argsString: string = buildArgsString(where);
  const varsString: string = buildVarsString(initialVariables);

  const snakeOperation: string = snakeCase(operation);

  const query: DocumentNode = gql`
      query ${queryString}${varsString} {
        ${snakeOperation}${argsString} ${buildFieldsString(fields)}
      }
    `;

  const [queryFn, result] = useApolloLazyQuery(
    query,
    initialVariables
      ? {
          variables: Object.entries(initialVariables).reduce(
            (acc, [key, value]) => {
              return { ...acc, [key]: value.value };
            },
            {}
          )
        }
      : {}
  );

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
