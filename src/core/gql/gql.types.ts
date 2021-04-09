export interface CustomQueryArgs {
  fields: string[];
  queryName: string;
  skip?: boolean;
}

export interface FindOneArgs<T> {
  fields?: (keyof T | string)[];
  skip?: boolean;
  where: Record<string, unknown>;
}

export interface QueryResult<T = unknown> {
  data: T;
  error: string;
  loading: boolean;
}

export type QueryOperator = '_eq' | '_lt' | '_gt';
