import { makeVar, ReactiveVar } from '@apollo/client';

/**
 * Returns the search string used in the PastEventsList.
 */
export const eventsPastSearchStringVar: ReactiveVar<string> = makeVar<string>(
  ''
);

interface EventsReactiveFields {
  eventsPastSearchString: { read: () => string };
}

export const eventsReactiveFields: EventsReactiveFields = {
  eventsPastSearchString: {
    read: (): string => `${eventsPastSearchStringVar()}%`
  }
};
