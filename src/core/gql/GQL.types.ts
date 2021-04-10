export enum GQLOperation {
  CREATE = 'Create',
  FIND = 'Find',
  FIND_ONE = 'FindOne',
  UPDATE = 'Update'
}

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

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export interface CreateArgs<T> {
  data: RecursivePartial<T>;
  fields: string[];
}

export interface UpdateArgs<T> {
  data: RecursivePartial<T>;
  where: RecursivePartial<T>;
}

export interface MutationResult<T = unknown> {
  data: T;
  error: string;
}
