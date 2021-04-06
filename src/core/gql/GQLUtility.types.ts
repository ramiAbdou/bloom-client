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

export interface GQLUtilityFindOneArgs<T> {
  fields: string[];
  where: RecursivePartial<T>;
}

export interface GQLUtilityFindOneResult<T> {
  data: T;
  error?: string;
}

export interface GQLUtilityFromCacheArgs<T> {
  id: string;
  fields?: (keyof T | string)[];
}

export interface GQLUtilityUpdateArgs<T> {
  data: RecursivePartial<T>;
  where: RecursivePartial<T>;
}

export interface GQLUtilityUpdateResult<T> {
  data: T;
  error?: string;
}
