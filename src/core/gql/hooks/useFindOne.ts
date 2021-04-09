import { ApolloQueryResult, DocumentNode, useQuery } from '@apollo/client';
import { getFindOneQuery, parseFindOneQueryResult } from '../findOne';
import { FindOneArgs, QueryResult } from '../GQL.types';

function useFindOne<T>(
  entity: new () => T,
  { fields, skip, where }: FindOneArgs<T>
): T {
  const query: DocumentNode = getFindOneQuery(entity, { fields, where });
  const result: ApolloQueryResult<unknown> = useQuery(query, { skip });
  const parsedResult: QueryResult<T> = parseFindOneQueryResult(entity, result);
  return parsedResult.data;
}

export default useFindOne;
