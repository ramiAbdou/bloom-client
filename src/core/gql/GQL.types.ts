type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

type RecursiveWherePartial<T> = {
  [P in keyof T]?: T[P] extends string
    ? string | { _in?: string[]; _lt?: string; _gt?: string }
    : RecursiveWherePartial<T[P]>;
};

export enum GQLOperation {
  FIND = 'Find',
  FIND_ONE = 'FindOne'
}

interface CreateArgsModification<T> {
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
  modifications?: CreateArgsModification<S>[];
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
  where: RecursiveWherePartial<T>;
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
