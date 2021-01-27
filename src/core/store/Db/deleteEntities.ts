import { Action, action } from 'easy-peasy';

import { DbModel, DeleteEntitiesArgs } from './Db.types';

const deleteEntities: Action<DbModel, DeleteEntitiesArgs> = action(
  (
    { entities, ...state },
    { ids, refs, table: tableName }: DeleteEntitiesArgs
  ) => {
    const table = entities[tableName];

    const idsToDelete = new Set(ids);

    const updatedById = Object.entries(table.byId).reduce(
      (acc, [key, value]) => {
        if (idsToDelete.has(key)) return acc;
        return { ...acc, [key]: value };
      },
      {}
    );

    const updatedRefTables = refs.reduce(
      (acc, { id, column, table: refTableName }) => {
        const tableBeforeUpdate = entities[refTableName];
        const entityBeforeUpdate = tableBeforeUpdate.byId[id];
        const isArray = Array.isArray(entityBeforeUpdate[column]);

        const updatedEntity = {
          ...entityBeforeUpdate,
          [column]: isArray
            ? [
                ...(entityBeforeUpdate[column] as string[]).filter(
                  (refId: string) => !idsToDelete.has(refId)
                )
              ]
            : null
        };

        return {
          ...acc,
          [refTableName]: {
            ...tableBeforeUpdate,
            byId: {
              ...tableBeforeUpdate.byId,
              [updatedEntity.id]: updatedEntity
            }
          }
        };
      },
      {}
    );

    const updatedTable = { ...table, byId: updatedById };

    return {
      ...state,
      entities: {
        ...entities,
        ...updatedRefTables,
        [tableName]: updatedTable
      }
    };
  }
);

export default deleteEntities;
