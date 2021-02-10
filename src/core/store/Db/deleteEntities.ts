import { Action, action } from 'easy-peasy';

import { DbModel, DeleteEntitiesArgs } from './Db.types';

const getUpdatedRefTable = ({ idsToDelete, entities, id, column, table }) => {
  // Get the table and the entity before any updates are applied.
  const preTable = entities[table];
  const preEntity = preTable.byId[id];

  const preEntityRefColumn = preEntity[column];

  // If the column on the entity an array (M:N relationship), then iterate
  // and filter out the
  const updatedEntity = {
    ...preEntity,
    [column]: Array.isArray(preEntityRefColumn)
      ? [
          ...(preEntityRefColumn as string[]).filter(
            (refId: string) => !idsToDelete.has(refId)
          )
        ]
      : null
  };

  return {
    [table]: { ...preTable, byId: { ...preTable.byId, [id]: updatedEntity } }
  };
};

const getUpdatedMainTable = ({ entities, idsToDelete, table: tableName }) => {
  const table = entities[tableName];

  const updatedById = Object.entries(table.byId).reduce((acc, [key, value]) => {
    if (idsToDelete.has(key)) return acc;
    return { ...acc, [key]: value };
  }, {});

  return { ...table, byId: updatedById };
};

const deleteEntities: Action<DbModel, DeleteEntitiesArgs> = action(
  ({ entities, ...state }, { ids, refs, table }: DeleteEntitiesArgs) => {
    const idsToDelete = new Set(ids);

    const updatedRefTables = refs?.reduce((acc, ref) => {
      return {
        ...acc,
        ...getUpdatedRefTable({ ...ref, entities, idsToDelete })
      };
    }, {});

    const updatedMainTable = getUpdatedMainTable({
      entities,
      idsToDelete,
      table
    });

    return {
      ...state,
      entities: { ...entities, ...updatedRefTables, [table]: updatedMainTable }
    };
  }
);

export default deleteEntities;
