import pluralize from 'pluralize';
import { communityIdVar, directorySearchStringVar } from 'src/reactive';

import { InMemoryCache } from '@apollo/client';
import {
  IApplication,
  ICommunity,
  ICommunityIntegrations,
  IEvent,
  IEventAttendee,
  IEventGuest,
  IEventWatch,
  IMember,
  IMemberIntegrations,
  IMemberSocials,
  IMemberType,
  IMemberValue,
  IPayment,
  IQuestion,
  IRankedQuestion,
  ISupporter,
  IUser
} from '@core/db/db.entities';

/**
 * Resolves the Apollo Client query so that once an entity is fetched, if we
 * query by it's ID, then we'll be able to use our cache store for it.
 */
function resolveReadQuery<T>(entity: new () => T) {
  // All of our entity types start with an I (ex: IMember, IUser, etc).
  const nameWithoutI: string = entity.name.substring(1);
  const entityName: string = pluralize(nameWithoutI);

  return (existing, { args, toReference }) => {
    if (args.where?.id) {
      return toReference({
        __typename: entityName,
        // eslint-disable-next-line no-underscore-dangle
        id: args.where?.id?._eq
      });
    }

    return existing;
  };
}

const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        applications: resolveReadQuery(IApplication),
        communities: resolveReadQuery(ICommunity),
        communityId: { read: (): string => communityIdVar() },
        communityIntegrations: resolveReadQuery(ICommunityIntegrations),
        directorySearchString: {
          read: (): string => `%${directorySearchStringVar()}%`
        },
        directorySearchStringStarting: {
          read: (): string => `${directorySearchStringVar()}%`
        },
        eventAttendees: resolveReadQuery(IEventAttendee),
        eventGuests: resolveReadQuery(IEventGuest),
        eventWatches: resolveReadQuery(IEventWatch),
        events: resolveReadQuery(IEvent),
        memberIntegrations: resolveReadQuery(IMemberIntegrations),
        memberSocials: resolveReadQuery(IMemberSocials),
        memberTypes: resolveReadQuery(IMemberType),
        memberValues: resolveReadQuery(IMemberValue),
        members: resolveReadQuery(IMember),
        payments: resolveReadQuery(IPayment),
        questions: resolveReadQuery(IQuestion),
        rankedQuestions: resolveReadQuery(IRankedQuestion),
        supporters: resolveReadQuery(ISupporter),
        users: resolveReadQuery(IUser)
      }
    }
  }
});

export default cache;
