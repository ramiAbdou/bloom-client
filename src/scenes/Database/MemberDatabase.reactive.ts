import { makeVar, ReactiveVar } from '@apollo/client';

/**
 * Returns the search string used in the PastEventsList.
 */
export const databaseSearchStringVar: ReactiveVar<string> = makeVar<string>('');

interface DatabaseReactiveFields {
  databaseSearchString: { read: () => string };
  databaseSearchStringWord: { read: () => string };
}

export const databaseReactiveFields: DatabaseReactiveFields = {
  databaseSearchString: {
    read: (): string => `${databaseSearchStringVar()}%`
  },

  databaseSearchStringWord: {
    read: (): string => `%${databaseSearchStringVar()}%`
  }
};
