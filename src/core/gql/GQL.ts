import {
  ApolloClient,
  ApolloQueryResult,
  DocumentNode,
  FetchResult,
  gql
} from '@apollo/client';
import buildFieldsString from './buildFieldsString';
import {
  CustomMutationArgs,
  FindOneArgs,
  MutationResult,
  QueryResult
} from './GQL.types';
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

  async mutation<T>({
    fields,
    mutationName
  }: CustomMutationArgs): Promise<MutationResult<T>> {
    const fieldsString: string = buildFieldsString(fields);

    const mutation: DocumentNode = gql`
        mutation ${mutationName} {
          ${mutationName}(email: "rami@rami.com") {
            ${fieldsString}
          }
        }
      `;

    try {
      const result: FetchResult<unknown> = await this.client.mutate({
        mutation
      });

      return {
        data: result?.data ? result?.data[mutationName] : {},
        error: result.errors && result.errors[0]?.message
      };
    } catch (e) {
      return {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data: {},
        error: e.message
      };
    }
  }
}

export default GQL;
