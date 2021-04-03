import { Schema } from 'normalizr';

interface QueryArgsVariable {
  type: 'String!';
  value: string;
}

export interface QueryArgs {
  fields: string[];
  variables: Record<string, QueryArgsVariable>;
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
