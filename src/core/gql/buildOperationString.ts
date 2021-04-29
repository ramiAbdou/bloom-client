import pluralize from 'pluralize';

import { GQLOperation } from './GQL.types';

function buildOperationString<T>(
  entity: new () => T,
  operation: GQLOperation
): string {
  // All of our entity types start with an I (ex: IMember, IUser, etc).
  // To get the GraphQL version of the entity name, we make the name plural.
  const nameWithoutI: string = entity.name.substring(1);
  const entityName: string = pluralize(nameWithoutI).toLowerCase();

  switch (operation) {
    case GQLOperation.FIND_ONE:
      return entityName;

    case GQLOperation.FIND:
      return entityName;

    default:
      return entityName;
  }
}

export default buildOperationString;
