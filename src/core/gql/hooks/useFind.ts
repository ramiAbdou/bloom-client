import { ApolloQueryResult, DocumentNode, useQuery } from '@apollo/client';
import { FindOneArgs, QueryResult } from '../GQL.types';
import { getFindQuery, parseFindQueryResult } from '../repo/find';

function useFind<T>(
  entity: new () => T,
  { fields, skip, where }: FindOneArgs<T>
): T[] {
  const query: DocumentNode = getFindQuery(entity, { fields, where });
  const result: ApolloQueryResult<unknown> = useQuery(query, { skip });
  const parsedResult: QueryResult<T[]> = parseFindQueryResult(entity, result);
  return parsedResult?.data;
}

export default useFind;
