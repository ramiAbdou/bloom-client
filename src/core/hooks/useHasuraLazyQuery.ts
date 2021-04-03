import camelCaseKeys from 'camelcase-keys';
import { snakeCase } from 'change-case';
import { Schema } from 'normalizr';
import { useEffect } from 'react';

import { DocumentNode, gql, useLazyQuery } from '@apollo/client';
import { QueryResult } from '@hooks/useQuery.types';
import { useStoreActions } from '@store/Store';

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

const buildQuery = (fields: string[]) => {
  const snakeCaseFields: string[] = fields.reduce(
    (acc: string[], curr: string) => {
      const a = curr
        .split('.')
        .map((val) => snakeCase(val))
        .join('.');

      return [...acc, a];
    },
    []
  );

  const set = (o = {}, a) => {
    const k = a.shift();
    o[k] = a.length ? set(o[k], a) : null;
    return o;
  };

  const o = snakeCaseFields.reduce((o, a) => set(o, a.split('.')), {});

  return JSON.stringify(o)
    .replace(/\"|\:|null/g, '')
    .replace(/^\{/, '')
    .replace(/\}$/, '');
};

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

  const a = `where: ${JSON.stringify(where).replace(/\"/g, '')}`;

  return a ? `(${a})` : a;
};

function useHasuraLazyQuery<T = any>({
  fields,
  operation,
  queryName: queryString,
  schema,
  variables,
  where
}: UseHasuraQueryArgs): [any, QueryResult<T>] {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const argsString: string = buildArgsString(where);
  const varsString: string = buildVarsString(variables);

  const snakeOperation: string = snakeCase(operation);

  const query: DocumentNode = gql`
      query ${queryString}${varsString} {
        ${snakeOperation}${argsString} {
          ${buildQuery(fields)}
        }
      }
    `;

  const [queryFn, result] = useLazyQuery(
    query,
    variables
      ? {
          variables: Object.entries(variables).reduce((acc, [key, value]) => {
            return { ...acc, [key]: value.value };
          }, {})
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

export default useHasuraLazyQuery;
