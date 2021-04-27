import { makeVar, ReactiveVar } from '@apollo/client';
import { SortTableArgs } from '@components/organisms/Table/Table.types';
import { QuestionCategory } from '@util/constants';

export const databaseSortArgsVar: ReactiveVar<SortTableArgs> = makeVar<SortTableArgs>(
  null
);

export const databaseSortDirectionVar: ReactiveVar<boolean> = makeVar<boolean>(
  false
);

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
  databaseOrderByExp: { read: () => Record<string, unknown> };
  databaseSearchString: { read: () => string };
  databaseSearchStringWord: { read: () => string };
}

export const databaseReactiveFields: DatabaseReactiveFields = {
  databaseOffset: { read: (): number => databaseOffsetVar() },

  databaseOrderByExp: {
    read: (): Record<string, unknown> => {
      const args: SortTableArgs = databaseSortArgsVar();

      if (!args?.column) return { joinedAt: 'desc' };

      const { column, sortDirection }: SortTableArgs = args;
      const direction: string = sortDirection?.toLowerCase();

      if (column.category === QuestionCategory.BIO) {
        return { bio: direction };
      }

      if (column.category === QuestionCategory.EMAIL) {
        return { email: direction };
      }

      if (column.category === QuestionCategory.EVENTS_ATTENDED) {
        return { eventAttendees_aggregate: { count: direction } };
      }

      if (column.category === QuestionCategory.FACEBOOK_URL) {
        return { memberSocials: { facebookUrl: direction } };
      }

      if (column.category === QuestionCategory.FIRST_NAME) {
        return { firstName: direction };
      }

      if (column.category === QuestionCategory.INSTAGRAM_URL) {
        return { memberSocials: { instagramUrl: direction } };
      }

      if (column.category === QuestionCategory.JOINED_AT) {
        return { joinedAt: direction };
      }

      if (column.category === QuestionCategory.LAST_NAME) {
        return { lastName: direction };
      }

      if (column.category === QuestionCategory.LINKED_IN_URL) {
        return { memberSocials: { linkedInUrl: direction } };
      }

      if (column.category === QuestionCategory.MEMBER_TYPE) {
        return { memberType: { name: direction } };
      }

      if (column.category === QuestionCategory.TWITTER_URL) {
        return { memberSocials: { twitterUrl: direction } };
      }

      return { joinedAt: 'desc' };
    }
  },

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
