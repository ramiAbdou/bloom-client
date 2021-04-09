import { ApolloQueryResult, DocumentNode, useQuery } from '@apollo/client';
import { getFindQuery, parseFindQueryResult } from './find';
import { FindOneArgs, QueryResult } from './gql.types';

function useFindFull<T>(
  entity: new () => T,
  { fields, skip, where }: FindOneArgs<T>
): QueryResult<T[]> {
  const query: DocumentNode = getFindQuery(entity, { fields, where });
  const result: ApolloQueryResult<unknown> = useQuery(query, { skip });
  const parsedResult: QueryResult<T[]> = parseFindQueryResult(entity, result);
  return parsedResult;
}

export default useFindFull;
