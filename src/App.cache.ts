import pluralize from 'pluralize';

import { InMemoryCache } from '@apollo/client';
import {
  IApplication,
  ICommunity,
  IEvent,
  IEventAttendee,
  IEventGuest,
  IEventWatch,
  IMember,
  IMemberSocials,
  IMemberType,
  IMemberValue,
  IQuestion,
  IRankedQuestion,
  ISupporter,
  IUser
} from '@util/constants.entities';
import {
  communityIdVar,
  eventIdVar,
  memberIdVar,
  memberSocialsIdVar,
  userIdVar
} from './App.reactive';
import { analyticsReactiveFields } from './scenes/Analytics/Analytics.reactive';
import { databaseReactiveFields } from './scenes/Database/Database.reactive';
import { directoryReactiveFields } from './scenes/Directory/Directory.reactive';
import { eventsReactiveFields } from './scenes/Events/Events.reactive';

/**
 * Resolves the Apollo Client query so that once an entity is fetched, if we
 * query by it's ID, then we'll be able to use our cache store for it.
 */
function resolveReadQuery<T>(entity: new () => T) {
  // All of our entity types start with an I (ex: IMember, IUser, etc).
  const nameWithoutI: string = entity.name.substring(1);
  const entityName: string = pluralize(nameWithoutI);

  return (existing, { args, toReference }) => {
    if (args?.where?.id) {
      return toReference({
        __typename: entityName,
        // eslint-disable-next-line no-underscore-dangle
        id: args?.where?.id?._eq
      });
    }

    return existing;
  };
}

const reactiveTypePolicies = {
  communityId: { read: (): string => communityIdVar() },
  eventId: { read: (): string => eventIdVar() },
  memberId: { read: (): string => memberIdVar() },
  memberSocialsId: { read: (): string => memberSocialsIdVar() },
  userId: { read: (): string => userIdVar() }
};

const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        ...reactiveTypePolicies,
        ...analyticsReactiveFields,
        ...databaseReactiveFields,
        ...directoryReactiveFields,
        ...eventsReactiveFields,
        applications: resolveReadQuery(IApplication),
        communities: resolveReadQuery(ICommunity),
        eventAttendees: resolveReadQuery(IEventAttendee),
        eventGuests: resolveReadQuery(IEventGuest),
        eventWatches: resolveReadQuery(IEventWatch),
        events: resolveReadQuery(IEvent),
        memberSocials: resolveReadQuery(IMemberSocials),
        memberTypes: resolveReadQuery(IMemberType),
        memberValues: resolveReadQuery(IMemberValue),
        members: resolveReadQuery(IMember),
        questions: resolveReadQuery(IQuestion),
        rankedQuestions: resolveReadQuery(IRankedQuestion),
        supporters: resolveReadQuery(ISupporter),
        users: resolveReadQuery(IUser)
      }
    }
  }
});

export default cache;
