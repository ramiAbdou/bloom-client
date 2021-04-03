import { Schema } from 'normalizr';

export interface QueryArgs {
  fields: string[];
  operation: string;
  queryName: string;
  schema?: Schema;
  skip?: boolean;
  where?: Record<string, unknown>;
}

export interface QueryResult<T = unknown> {
  called?: boolean;
  data: T;
  error: string;
  loading: boolean;
}
