type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export enum GQLOperation {
  CREATE = 'Create',
  FIND = 'Find',
  FIND_ONE = 'FindOne',
  UPDATE = 'Update'
}

export interface CreateArgs<T> {
  data: RecursivePartial<T>;
  fields: string[];
}

export interface CustomMutationArgs {
  fields: string[];
  mutationName: string;
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

export interface MutationResult<T = unknown> {
  data: T;
  error: string;
}

export interface QueryResult<T = unknown> {
  data: T;
  error: string;
  loading: boolean;
}

export interface UpdateArgs<T> {
  data: RecursivePartial<T>;
  where: RecursivePartial<T>;
}
