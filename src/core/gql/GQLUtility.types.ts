export interface GQLUtilityCreateArgs<T> {
  data: Partial<T>;
  fields: string[];
}

export interface GQLUtilityCreateResult<T> {
  data: T;
  error?: string;
}

export interface GQLUtilityFindOneArgs<T> {
  fields: string[];
  where: Partial<T>;
}

export interface GQLUtilityFindOneResult<T> {
  data: T;
  error?: string;
}

export interface GQLUtilityFromCacheArgs<T> {
  id: string;
  fields: (keyof T)[];
}

export interface GQLUtilityUpdateArgs<T> {
  data: Partial<T>;
  where: Partial<T>;
}

export interface GQLUtilityUpdateResult<T> {
  data: T;
  error?: string;
}
