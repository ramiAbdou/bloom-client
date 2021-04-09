import camelCaseKeys from 'camelcase-keys';
import { snakeCase } from 'change-case';
import day from 'dayjs';
import { nanoid } from 'nanoid';

import {
  ApolloClient,
  ApolloQueryResult,
  DocumentNode,
  gql
} from '@apollo/client';
import buildArgsString from './buildArgsString';
import buildFieldsString from './buildFieldsString';
import { getFindQuery, parseFindQueryResult } from './find';
import { getFindOneQuery, parseFindOneQueryResult } from './findOne';
import {
  FindOneArgs,
  GQLUtilityCreateArgs,
  GQLUtilityCreateResult,
  GQLUtilityUpdateArgs,
  GQLUtilityUpdateResult,
  QueryResult
} from './GQL.types';

class GQL {
  client: ApolloClient<unknown>;

  constructor(client: ApolloClient<unknown>) {
    this.client = client;
  }

  async create<T>(
    entity: new () => T,
    { data, fields }: GQLUtilityCreateArgs<T>
  ): Promise<GQLUtilityCreateResult<T>> {
    const object = {
      ...data,
      createdAt: day.utc().format(),
      id: nanoid(),
      updatedAt: day.utc().format()
    };

    const argsString: string = buildArgsString({ object });
    const fieldsString: string = buildFieldsString(fields);

    const operationString: string = snakeCase(`insert__one`);
    // const operationString: string = snakeCase(
    //   `insert_${this.getEntityName()}_one`
    // );

    const mutation: DocumentNode = gql`
        mutation Create${entity.name.substring(1)} {
          ${operationString} ${argsString} {
            id
            ${fieldsString}
          }
        }
      `;

    const response = await this.client.mutate({ mutation });

    const result: T = camelCaseKeys(
      response.data ? response.data[operationString] : null,
      { deep: true }
    );

    return {
      data: result,
      error: response.errors?.length && response.errors[0]?.message
    };
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
    { data, where }: GQLUtilityUpdateArgs<T>
  ): Promise<GQLUtilityUpdateResult<T>> {
    const set = { ...data, updatedAt: day.utc().format() };

    const argsString: string = buildArgsString({ set, where });
    const fieldsString: string = buildFieldsString(Object.keys(set));
    const operationString: string = snakeCase(`update_`);
    // const operationString: string = snakeCase(`update_${this.getEntityName()}`);

    const mutation: DocumentNode = gql`
      mutation Update${entity.name.substring(1)} {
        ${operationString} ${argsString} {
          returning {
            id
            ${fieldsString}
          }
        }
      }
    `;

    const response = await this.client.mutate({ mutation });

    const camelCaseData: T[] = camelCaseKeys(
      response.data ? response.data[operationString]?.returning : null,
      { deep: true }
    );

    const result: T = camelCaseData?.length ? camelCaseData[0] : null;

    return {
      data: result,
      error: response.errors?.length && response.errors[0]?.message
    };
  }
}

export default GQL;
