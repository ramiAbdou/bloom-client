import { ActionCreator } from 'easy-peasy';
import { Schema } from 'normalizr';

import { ApolloClient } from '@apollo/client';
import { MergeEntitiesArgs } from '../store/Db/Db.types';

export interface MutationArgs {
  client: ApolloClient<unknown>;
  fields: string[];
  operation: string;
  mergeEntities?: ActionCreator<MergeEntitiesArgs>;
  schema: Schema;
  set?: Record<string, unknown>;
  where?: Record<string, unknown>;
}

export interface MutationRuntimeArgs<S> {
  set?: Partial<S>;
  where?: Record<string, unknown>;
}

export type MutationResult<T = unknown> = [
  (runtimeArgs: MutationRuntimeArgs<T>) => Promise<any>,
  QueryResult<T>
];

export interface MutateResult<T = unknown> {
  data?: T;
  error?: string;
}

export interface QueryArgs {
  fields: string[];
  operation: string;
  schema: Schema;
  where?: Record<string, unknown>;
}

export interface QueryResult<T = unknown> {
  called?: boolean;
  data: T;
  error: string;
  loading: boolean;
}
