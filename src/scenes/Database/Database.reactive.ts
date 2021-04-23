import { makeVar, ReactiveVar } from '@apollo/client';

export const databaseIsAdminsOnlyVar: ReactiveVar<boolean> = makeVar<boolean>(
  false
);

/**
 * Returns the search string used in the PastEventsList.
 */
export const databaseSearchStringVar: ReactiveVar<string> = makeVar<string>('');

interface DatabaseReactiveFields {
  databaseRoleExp: { read: () => Record<string, unknown> };
  databaseSearchString: { read: () => string };
  databaseSearchStringWord: { read: () => string };
}

export const databaseReactiveFields: DatabaseReactiveFields = {
  databaseRoleExp: {
    read: (): Record<string, unknown> =>
      databaseIsAdminsOnlyVar() ? { _in: ['Admin', 'Owner'] } : {}
  },

  databaseSearchString: {
    read: (): string => `${databaseSearchStringVar()}%`
  },

  databaseSearchStringWord: {
    read: (): string => `%${databaseSearchStringVar()}%`
  }
};
