import Fields from 'gql-query-builder/build/Fields';
import VariableOptions from 'gql-query-builder/build/VariableOptions';
import { Schema } from 'normalizr';

import { DeleteEntitiesRef } from '../store/Db/Db.types';
import { IEntities } from '../store/Db/entities';

export type UseMutationArgs<T, S> = {
  deleteArgs?: {
    ids: string[];
    refs?: DeleteEntitiesRef[];
    table: keyof IEntities;
  };
  fields?: Fields;
  operation: string;
  schema?: Schema;
  types?: VariableOptions;
  variables?: S;
};

type UseMutationFnResult<T> = { data: T; error: string; loading: boolean };

export type UseMutationResult<T, S> = [
  (variables?: S) => Promise<UseMutationFnResult<T>>,
  UseMutationFnResult<T>
];
