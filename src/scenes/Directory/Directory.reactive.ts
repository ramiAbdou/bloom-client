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
 * DirectoryFilterPanel. Returns null if no questions are expanded.
 */
export const directoryFilterOpenQuestionIdVar: ReactiveVar<string> = makeVar<string>(
  null
);

export interface DirectoryFilterSelectedValue {
  questionId: string;
  value: string;
}

export const directoryFilterSelectedValuesVar: ReactiveVar<
  DirectoryFilterSelectedValue[]
> = makeVar<DirectoryFilterSelectedValue[]>([]);

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
      const values = directoryFilterSelectedValuesVar();
      if (!values.length) return {};

      return {
        _and: values.map((value) => {
          return {
            questionId: { _eq: value.questionId },
            value: { _eq: value.value }
          };
        })
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
