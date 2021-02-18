import { Action, action } from 'easy-peasy';
import { normalize } from 'normalizr';

import { DbModel, MergeEntitiesArgs, SetActiveArgs } from './Db.types';
import { IEntities } from './entities';
import { mergeStrategy } from './schema';

/**
 * Main update function that updates all entities (front-end DB). Uses
 * the deepmerge library function to make the updates.
 */
export const mergeEntities: Action<DbModel, MergeEntitiesArgs> = action(
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

/**
 * Updates the activeId of a series of tables or just one table.
 */
export const setActive: Action<
  DbModel,
  SetActiveArgs | SetActiveArgs[]
> = action((state, args: SetActiveArgs | SetActiveArgs[]) => {
  const argsArr = Array.isArray(args) ? args : [args];

  const updatedEntities: IEntities = argsArr.reduce(
    (acc: IEntities, currentArgs: SetActiveArgs) => {
      const { id, table } = currentArgs;
      return { ...acc, [table]: { ...acc[table], activeId: id } };
    },
    { ...state.entities }
  );

  return { ...state, entities: updatedEntities };
});
