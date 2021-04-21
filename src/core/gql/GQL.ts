import pluralize from 'pluralize';

import {
  ApolloClient,
  ApolloQueryResult,
  DocumentNode,
  FetchResult,
  gql,
  Reference
} from '@apollo/client';
import buildFieldsString from './buildFieldsString';
import buildOperationString from './buildOperationString';
import {
  CreateArgs,
  CustomMutationArgs,
  FindOneArgs,
  GQLOperation,
  MutationResult,
  QueryResult,
  UpdateArgs
} from './GQL.types';
import { getCreateMutation, parseCreateMutationResult } from './repo/create';
import { getFindQuery, parseFindQueryResult } from './repo/find';
import { getFindOneQuery, parseFindOneQueryResult } from './repo/findOne';
import {
  getUpdateMutation,
  parseUpdateManyResult,
  parseUpdateResult
} from './repo/update';

class GQL {
  client: ApolloClient<unknown>;

  constructor(client: ApolloClient<unknown>) {
    this.client = client;
  }

  async create<T>(
    entity: new () => T,
    { data, fields, modifications }: CreateArgs<T>
  ): Promise<MutationResult<T>> {
    const mutation: DocumentNode = getCreateMutation(entity, { data, fields });

    const result: FetchResult<unknown> = await this.client.mutate({
      mutation,
      update: (cache, createResult) => {
        const nameWithoutI: string = entity.name.substring(1);
        const entityName: string = pluralize(nameWithoutI);

        const createOperationString: string = buildOperationString(
          entity,
          GQLOperation.CREATE
        );

        const fieldsString: string = buildFieldsString([
          ...(fields ?? []),
          'id'
        ] as string[]);

        const resultData = createResult.data[createOperationString];

        cache.modify({
          fields: {
            [entityName]: (existingEntityRefs = []) => {
              const newEntityRef: Reference = cache.writeFragment({
                data: resultData,
                fragment: gql`
                  fragment New${nameWithoutI} on ${entityName} {
                    ${fieldsString}
                  }
                `
              });

              return [...existingEntityRefs, newEntityRef];
            }
          }
        });

        if (modifications) {
          modifications.forEach((modification) => {
            cache.modify({
              fields: {
                [modification.field as string]: (existingRefs = []) => {
                  const newEntityRef = cache.writeFragment({
                    data: resultData,
                    fragment: gql`
                    fragment New${nameWithoutI} on ${entityName} {
                      ${fieldsString}
                    }
                  `
                  });

                  return [...existingRefs, newEntityRef];
                }
              },
              id: `${entityName}:${modification.id}`
            });
          });
        }
      }
    });

    const parsedResult: MutationResult<T> = parseCreateMutationResult(
      entity,
      result
    );

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

  async update<T>(
    entity: new () => T,
    { data, where }: UpdateArgs<T>
  ): Promise<MutationResult<T>> {
    const mutation: DocumentNode = getUpdateMutation(entity, { data, where });
    const result: FetchResult<unknown> = await this.client.mutate({ mutation });
    const parsedResult: MutationResult<T> = parseUpdateResult(entity, result);
    return parsedResult;
  }

  async updateMany<T>(
    entity: new () => T,
    { data, where }: UpdateArgs<T>
  ): Promise<MutationResult<T[]>> {
    const mutation: DocumentNode = getUpdateMutation(entity, { data, where });
    const result: FetchResult<unknown> = await this.client.mutate({ mutation });

    const parsedResult: MutationResult<T[]> = parseUpdateManyResult(
      entity,
      result
    );

    return parsedResult;
  }
}

export default GQL;
