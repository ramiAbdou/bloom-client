import { Action, action } from 'easy-peasy';
import { normalize } from 'normalizr';

import { IEntities } from './entities';
import { mergeStrategy } from './schema';
import { DbModel, MergeEntitiesArgs } from './Db.types';

const mergeEntities: Action<DbModel, MergeEntitiesArgs> = action(
  (state, { data, schema, setActiveId }: MergeEntitiesArgs) => {
    const normalizedEntities = normalize(data, schema).entities;

    const parsedEntities = Object.entries(normalizedEntities).reduce(
      (acc: Record<string, any>, [key, value]) => {
        const activeId = setActiveId
          ? key === 'users' && { activeId: Object.keys(value)[0] }
          : {};

        return { ...acc, [key]: { ...activeId, byId: value } };
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
