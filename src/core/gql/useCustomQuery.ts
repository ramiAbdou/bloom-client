import { DocumentNode, gql, useQuery } from '@apollo/client';
import buildFieldsString from './buildFieldsString';
import { CustomQueryArgs, QueryResult } from './gql.types';

function useCustomQuery<T>({
  fields,
  queryName,
  skip
}: CustomQueryArgs): QueryResult<T> {
  const fieldsString: string = buildFieldsString(fields, false);

  const query: DocumentNode = gql`
      query ${queryName} {
        ${queryName} {
          ${fieldsString}
        }
      }
    `;

  const { data, error, loading } = useQuery(query, { skip });

  return {
    data: data ? data[queryName] : null,
    error: error?.message,
    loading
  };
}

export default useCustomQuery;
