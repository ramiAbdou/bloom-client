import { makeVar, ReactiveVar } from '@apollo/client';

export const databaseIsAdminsOnlyVar: ReactiveVar<boolean> = makeVar<boolean>(
  false
);

export const databaseOffsetVar: ReactiveVar<number> = makeVar<number>(0);

/**
 * Returns the search string used in the PastEventsList.
 */
export const databaseSearchStringVar: ReactiveVar<string> = makeVar<string>('');

interface DatabaseReactiveFields {
  databaseOffset: { read: () => number };
  databaseRoleExp: { read: () => Record<string, unknown> };
  databaseSearchString: { read: () => string };
  databaseSearchStringWord: { read: () => string };
}

export const databaseReactiveFields: DatabaseReactiveFields = {
  databaseOffset: { read: () => databaseOffsetVar() },

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
