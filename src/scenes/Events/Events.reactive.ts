import { makeVar, ReactiveVar } from '@apollo/client';
import { SortTableArgs } from '../../components/organisms/Table/Table.types';

/**
 * Returns the search string used in the PastEventsList.
 */
export const eventsPastSearchStringVar: ReactiveVar<string> = makeVar<string>(
  ''
);

export const individualEventInteractionsTableSortVar: ReactiveVar<SortTableArgs> = makeVar<SortTableArgs>(
  null
);

interface IndividualEventTableVarState {
  limit: number;
  offset: number;
  orderBy: 'event_attendees' | 'event_guests' | 'event_watches';
  orderDirection: 'asc' | 'desc';
}

export const individualEventTableVar: ReactiveVar<IndividualEventTableVarState> = makeVar<IndividualEventTableVarState>(
  { limit: 25, offset: 0, orderBy: 'event_guests', orderDirection: 'desc' }
);

interface EventsReactiveFields {
  eventsPastSearchString: { read: () => string };
  individualEventTableLimit: { read: () => number };
  individualEventTableOffset: { read: () => number };
  individualEventTableOrderBy: { read: () => string };
  individualEventTableOrderDirection: { read: () => string };
}

export const eventsReactiveFields: EventsReactiveFields = {
  eventsPastSearchString: {
    read: (): string => `${eventsPastSearchStringVar()}%`
  },

  individualEventTableLimit: {
    read: (): number => individualEventTableVar().limit
  },

  individualEventTableOffset: {
    read: (): number => individualEventTableVar().offset
  },

  individualEventTableOrderBy: {
    read: (): string => individualEventTableVar().orderBy
  },

  individualEventTableOrderDirection: {
    read: (): string => individualEventTableVar().orderDirection
  }
};
