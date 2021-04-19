type RecursivePartial<T> = {
  [P in keyof T]?: P extends string
    ? string | { _in?: string[] }
    : RecursivePartial<T[P]>;
};

export enum GQLOperation {
  CREATE = 'Create',
  FIND = 'Find',
  FIND_ONE = 'FindOne',
  UPDATE = 'Update'
}

interface CreateArgsModify<T> {
  entity: new () => T;
  id: string;
  field: RecursivePartial<T>;
}

export interface CreateArgs<T, S = unknown> {
  data: Omit<
    RecursivePartial<T>,
    'createdAt' | 'deletedAt' | 'id' | 'updatedAt'
  >;
  fields: string[];
  modify?: CreateArgsModify<S>;
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
  data: Omit<RecursivePartial<T>, 'createdAt' | 'id' | 'updatedAt'>;
  where: RecursivePartial<T>;
}
