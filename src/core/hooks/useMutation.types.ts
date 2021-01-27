import { Schema } from 'normalizr';

import { DeleteEntitiesRef } from '../store/Db/Db.types';
import { IEntities } from '../store/Db/entities';

export type UseMutationArgs<T, S> = {
  deleteArgs?: {
    ids: string[];
    refs?: DeleteEntitiesRef[];
    table: keyof IEntities;
  };
  format?: (data: T) => any;
  name: string;
  query: string;
  schema?: Schema;
  variables?: S;
};

type UseMutationFnResult<T> = { data: T; error: string; loading: boolean };

export type UseMutationResult<T, S> = [
  (variables?: S) => Promise<UseMutationFnResult<T>>,
  UseMutationFnResult<T>
];
