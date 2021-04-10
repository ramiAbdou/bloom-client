import { ApolloQueryResult, DocumentNode, useQuery } from '@apollo/client';
import { FindOneArgs, QueryResult } from '../GQL.types';
import { getFindOneQuery, parseFindOneQueryResult } from '../repo/findOne';

function useFindOneFull<T>(
  entity: new () => T,
  { fields, skip, where }: FindOneArgs<T>
): QueryResult<T> {
  const query: DocumentNode = getFindOneQuery(entity, { fields, where });
  const result: ApolloQueryResult<unknown> = useQuery(query, { skip });
  const parsedResult: QueryResult<T> = parseFindOneQueryResult(entity, result);
  return parsedResult;
}

export default useFindOneFull;
