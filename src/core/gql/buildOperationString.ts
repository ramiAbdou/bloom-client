import { snakeCase } from 'change-case';
import pluralize from 'pluralize';

import { GQLOperation } from './GQL.types';

function buildOperationString<T>(
  entity: new () => T,
  operation: GQLOperation
): string {
  // All of our entity types start with an I (ex: IMember, IUser, etc).
  // To get the GraphQL version of the entity name, we make the name plural
  // and convert to snake case (which automatically converts to lowercase).
  const nameWithoutI: string = entity.name.substring(1);
  const entityName: string = snakeCase(pluralize(nameWithoutI));

  switch (operation) {
    case GQLOperation.CREATE:
      return `insert_${entityName}_one`;

    case GQLOperation.FIND_ONE:
      return entityName;

    case GQLOperation.FIND:
      return entityName;

    case GQLOperation.UPDATE:
      return `update_${entityName}`;

    default:
      return entityName;
  }
}

export default buildOperationString;
