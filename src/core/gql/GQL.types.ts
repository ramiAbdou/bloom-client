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

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export interface GQLUtilityCreateArgs<T> {
  data: RecursivePartial<T>;
  fields: string[];
}

export interface GQLUtilityCreateResult<T> {
  data: T;
  error?: string;
}

export interface GQLUtilityUpdateArgs<T> {
  data: RecursivePartial<T>;
  where: RecursivePartial<T>;
}

export interface GQLUtilityUpdateResult<T> {
  data: T;
  error?: string;
}
