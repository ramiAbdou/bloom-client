import { ApolloClient, ApolloQueryResult, DocumentNode } from '@apollo/client';
import { FindOneArgs, QueryResult } from './GQL.types';
import { getFindOneQuery, parseFindOneQueryResult } from './repo/findOne';

class GQL {
  client: ApolloClient<unknown>;

  constructor(client: ApolloClient<unknown>) {
    this.client = client;
  }

  async findOne<T>(
    entity: new () => T,
    { fields, where }: FindOneArgs<T>
  ): Promise<T> {
    const query: DocumentNode = getFindOneQuery(entity, { fields, where });

    const result: ApolloQueryResult<unknown> = await this.client.query({
      query
    });

    const parsedResult: QueryResult<T> = parseFindOneQueryResult(
      entity,
      result
    );

    return parsedResult.data;
  }
}

export default GQL;
