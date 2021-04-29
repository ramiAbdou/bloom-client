import { makeVar, ReactiveVar } from '@apollo/client';

/**
 * Returns true if the "Admins Only" quick filter is enabled in the Directory.
 * Returns false, otherwise.
 */
export const directoryIsAdminsOnlyVar: ReactiveVar<boolean> = makeVar<boolean>(
  false
);

/**
 * Returns the ID of the IQuestion that is currently expanded in the
 * FilterDirectoryPanel. Returns null if no questions are expanded.
 */
export const directoryFilterOpenQuestionIdVar: ReactiveVar<string> = makeVar<string>(
  null
);

export interface DirectoryFilterSelectedValue {
  questionId: string;
  value: string;
}

/**
 * Returns an array of DirectoryFilterSelectedValue(s) based on the values
 * that are selected in the FilterDirectoryPanel.
 *
 * @example
 * // Returns [{ questionId: "1", value: "Computer Science" }].
 * directoryFilterSelectedValuesVar()
 */
export const directoryFilterSelectedValuesVar: ReactiveVar<
  DirectoryFilterSelectedValue[]
> = makeVar<DirectoryFilterSelectedValue[]>([]);

/**
 * Returns the search string used in the Directory.
 */
export const directorySearchStringVar: ReactiveVar<string> = makeVar<string>(
  ''
);

interface DirectoryReactiveFields {
  directoryMemberValuesExp: { read: () => Record<string, unknown> };
  directoryRoleExp: { read: () => Record<string, unknown> };
  directorySearchString: { read: () => string };
  directorySearchStringStarting: { read: () => string };
}

export const directoryReactiveFields: DirectoryReactiveFields = {
  directoryMemberValuesExp: {
    read: (): Record<string, unknown> => {
      const values: DirectoryFilterSelectedValue[] = directoryFilterSelectedValuesVar();

      if (!values.length) return {};

      const valueRecord: Record<string, string[]> = values.reduce(
        (acc, { questionId, value }) => {
          return { ...acc, [questionId]: [...(acc[questionId] ?? []), value] };
        },
        {}
      );

      return {
        _and: Object.entries(valueRecord).map(
          ([questionId, value]: [string, string[]]) => {
            return {
              memberValues: {
                questionId: { _eq: questionId },
                value: { _in: value }
              }
            };
          }
        )
      };
    }
  },

  directoryRoleExp: {
    read: (): Record<string, unknown> =>
      directoryIsAdminsOnlyVar() ? { _in: ['Admin', 'Owner'] } : {}
  },

  directorySearchString: {
    read: (): string => `%${directorySearchStringVar()}%`
  },

  directorySearchStringStarting: {
    read: (): string => `${directorySearchStringVar()}%`
  }
};
