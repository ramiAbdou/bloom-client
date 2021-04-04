import { Schema } from 'normalizr';

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

export type QueryOperator = '_eq' | '_lt' | '_gt';
