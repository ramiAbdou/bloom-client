import camelCaseKeys from 'camelcase-keys';
import { snakeCase } from 'change-case';
import day from 'dayjs';
import { nanoid } from 'nanoid';
import pluralize from 'pluralize';

import {
  ApolloClient,
  ApolloQueryResult,
  DocumentNode,
  gql
} from '@apollo/client';
import { QueryResult } from '@gql/gql.types';
import buildArgsString from './buildArgsString';
import buildFieldsString from './buildFieldsString';
import { getFindOneQuery, parseFindOneQueryResult } from './findOne';
import {
  GQLUtilityCreateArgs,
  GQLUtilityCreateResult,
  GQLUtilityFindOneArgs,
  GQLUtilityFindOneResult,
  GQLUtilityUpdateArgs,
  GQLUtilityUpdateResult
} from './GQLUtility.types';

class GQLUtility<T> {
  client: ApolloClient<any>;

  entity: new () => T;

  name: string;

  constructor(entity: new () => T, client: ApolloClient<any>) {
    this.client = client;
    this.entity = entity;
    this.name = entity.name;
  }

  async create({
    data,
    fields
  }: GQLUtilityCreateArgs<T>): Promise<GQLUtilityCreateResult<T>> {
    const object = {
      ...data,
      createdAt: day.utc().format(),
      id: nanoid(),
      updatedAt: day.utc().format()
    };

    const argsString: string = buildArgsString({ object });
    const fieldsString: string = buildFieldsString(fields);

    const operationString: string = snakeCase(
      `insert_${this.getEntityName()}_one`
    );

    const mutation: DocumentNode = gql`
        mutation Create${this.name.substring(1)} {
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

  async findOne({
    fields,
    where
  }: GQLUtilityFindOneArgs<T>): Promise<GQLUtilityFindOneResult<T>> {
    const query: DocumentNode = getFindOneQuery(this.entity, { fields, where });

    const result: ApolloQueryResult<unknown> = await this.client.query({
      query
    });

    const parsedResult: QueryResult<T> = parseFindOneQueryResult(
      this.entity,
      result
    );

    return parsedResult;
  }

  async update({
    data,
    where
  }: GQLUtilityUpdateArgs<T>): Promise<GQLUtilityUpdateResult<T>> {
    const set = { ...data, updatedAt: day.utc().format() };

    const argsString: string = buildArgsString({ set, where });
    const fieldsString: string = buildFieldsString(Object.keys(set));
    const operationString: string = snakeCase(`update_${this.getEntityName()}`);

    const mutation: DocumentNode = gql`
      mutation Update${this.name.substring(1)} {
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

  /**
   * Returns the lowercase, snake-case version of the entity. Resolves to be
   * same as the PostgreSQL table name (which is what GraphQL uses).
   *
   * @example
   * // Returns "users" from "IUser".
   * GQLUtility.getEntityName()
   */
  private getEntityName(): string {
    const nameWithoutI: string = this.name.substring(1);
    const pluralNameWithoutI: string = pluralize(nameWithoutI);
    return snakeCase(pluralNameWithoutI);
  }
}

export default GQLUtility;
