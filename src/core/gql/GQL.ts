import {
  ApolloClient,
  ApolloQueryResult,
  DocumentNode,
  FetchResult
} from '@apollo/client';
import {
  CreateArgs,
  FindOneArgs,
  MutationResult,
  QueryResult,
  UpdateArgs
} from './GQL.types';
import { getCreateMutation, parseCreateResult } from './repo/create';
import { getFindQuery, parseFindQueryResult } from './repo/find';
import { getFindOneQuery, parseFindOneQueryResult } from './repo/findOne';
import { getUpdateMutation, parseUpdateResult } from './repo/update';

class GQL {
  client: ApolloClient<unknown>;

  constructor(client: ApolloClient<unknown>) {
    this.client = client;
  }

  async create<T>(
    entity: new () => T,
    { data, fields }: CreateArgs<T>
  ): Promise<MutationResult<T>> {
    const mutation: DocumentNode = getCreateMutation(entity, { data, fields });
    const result: FetchResult<unknown> = await this.client.mutate({ mutation });
    const parsedResult: MutationResult<T> = parseCreateResult(entity, result);
    return parsedResult;
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

  async find<T>(
    entity: new () => T,
    { fields, where }: FindOneArgs<T>
  ): Promise<T[]> {
    const query: DocumentNode = getFindQuery(entity, { fields, where });

    const result: ApolloQueryResult<unknown> = await this.client.query({
      query
    });

    const parsedResult: QueryResult<T[]> = parseFindQueryResult(entity, result);
    return parsedResult.data;
  }

  async update<T>(
    entity: new () => T,
    { data, where }: UpdateArgs<T>
  ): Promise<MutationResult<T>> {
    const mutation: DocumentNode = getUpdateMutation(entity, { data, where });
    const result: FetchResult<unknown> = await this.client.mutate({ mutation });
    const parsedResult: MutationResult<T> = parseUpdateResult(entity, result);
    return parsedResult;
  }
}

export default GQL;
