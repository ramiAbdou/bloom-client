import { Action, action } from 'easy-peasy';
import { normalize } from 'normalizr';

import { DbModel, MergeEntitiesArgs } from './Db.types';
import { IEntities } from './entities';
import { mergeStrategy } from './schema';

/**
 * Main update function that updates all entities (front-end DB). Uses
 * the lodash deep merge function to make the updates.
 */
const mergeEntities: Action<DbModel, MergeEntitiesArgs> = action(
  (state, { data, schema }: MergeEntitiesArgs) => {
    const normalizedEntities = normalize(data, schema).entities;

    const parsedEntities = Object.entries(normalizedEntities).reduce(
      (acc: Record<string, any>, [key, value]) => {
        return { ...acc, [key]: { byId: value } };
      },
      {}
    );

    return {
      ...state,
      entities: mergeStrategy(state.entities, parsedEntities) as IEntities
    };
  }
);

export default mergeEntities;
