type RecursiveWherePartial<T> = {
  [P in keyof T]?: T[P] extends string
    ? string | { _in?: string[]; _lt?: string; _gt?: string }
    : RecursiveWherePartial<T[P]>;
};

export enum GQLOperation {
  FIND = 'Find',
  FIND_ONE = 'FindOne'
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

export interface QueryResult<T = unknown> {
  data: T;
  error: string;
  loading: boolean;
}
