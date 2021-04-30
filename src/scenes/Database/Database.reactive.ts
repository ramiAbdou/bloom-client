import { makeVar, ReactiveVar } from '@apollo/client';
import {
  OnApplyFiltersArgs,
  SortTableArgs,
  TableFilterExpanded,
  TableFilterJoinOperatorType,
  TableFilterOperatorType
} from '@components/organisms/Table/Table.types';
import { QuestionCategory } from '@util/constants';
import { take } from '@util/util';

export const databaseFiltersVar: ReactiveVar<OnApplyFiltersArgs> = makeVar<OnApplyFiltersArgs>(
  null
);

export const databaseIsAdminsOnlyVar: ReactiveVar<boolean> = makeVar<boolean>(
  false
);

export const databaseOffsetVar: ReactiveVar<number> = makeVar<number>(0);

export const databaseSortArgsVar: ReactiveVar<SortTableArgs> = makeVar<SortTableArgs>(
  null
);

export const databaseSortDirectionVar: ReactiveVar<boolean> = makeVar<boolean>(
  false
);

/**
 * Returns the search string used in the PastEventsList.
 */
export const databaseSearchStringVar: ReactiveVar<string> = makeVar<string>('');

export const clearDatabaseReactiveFields = (): void => {
  databaseFiltersVar(null);
  databaseIsAdminsOnlyVar(false);
  databaseOffsetVar(0);
  databaseSortArgsVar(null);
  databaseSortDirectionVar(null);
  databaseSearchStringVar('');
};

interface DatabaseReactiveFields {
  databaseFiltersExp: { read: () => Record<string, unknown> };
  databaseOffset: { read: () => number };
  databaseOrderByExp: { read: () => Record<string, unknown> };
  databaseRoleExp: { read: () => Record<string, unknown> };
  databaseSearchString: { read: () => string };
  databaseSearchStringWord: { read: () => string };
}

export const databaseReactiveFields: DatabaseReactiveFields = {
  databaseFiltersExp: {
    read: (): Record<string, unknown> => {
      const args: OnApplyFiltersArgs = databaseFiltersVar();
      const filters: TableFilterExpanded[] = args?.filters;
      const joinOperator: TableFilterJoinOperatorType = args?.joinOperator;

      if (!filters?.length || !joinOperator) return {};

      const mappedJoinOperator =
        joinOperator === TableFilterJoinOperatorType.AND ? '_and' : '_or';

      return {
        [mappedJoinOperator]: filters.map(
          ({ column, operator, value }: TableFilterExpanded) => {
            const mappedOperator: string = take([
              [operator === TableFilterOperatorType.IS, '_eq'],
              [operator === TableFilterOperatorType.IS_NOT, '_neq']
              // [operator === TableFilterOperatorType.INCLUDES, '_neq'],
            ]);

            switch (column.category) {
              case QuestionCategory.BIO:
                return { bio: { [mappedOperator]: value } };

              case QuestionCategory.EMAIL:
                return { email: { [mappedOperator]: value } };

              case QuestionCategory.EVENTS_ATTENDED:
                return { eventAttendees: { [mappedOperator]: value } };

              case QuestionCategory.FACEBOOK_URL:
                return {
                  memberSocials: { facebookUrl: { [mappedOperator]: value } }
                };

              case QuestionCategory.FIRST_NAME:
                return { firstName: { [mappedOperator]: value } };

              case QuestionCategory.INSTAGRAM_URL:
                return {
                  memberSocials: { instagramUrl: { [mappedOperator]: value } }
                };

              case QuestionCategory.JOINED_AT:
                return { joinedAt: { [mappedOperator]: value } };

              case QuestionCategory.LAST_NAME:
                return { lastName: { [mappedOperator]: value } };

              case QuestionCategory.LINKED_IN_URL:
                return {
                  memberSocials: { linkedInUrl: { [mappedOperator]: value } }
                };

              case QuestionCategory.MEMBER_TYPE:
                return {
                  memberType: { name: { [mappedOperator]: value } }
                };

              case QuestionCategory.TWITTER_URL:
                return {
                  memberSocials: { twitterUrl: { [mappedOperator]: value } }
                };

              default:
                return {
                  memberValues: {
                    questionId: { _eq: column.id },
                    value: { [mappedOperator]: value }
                  }
                };
            }
          }
        )
      };
    }
  },

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
