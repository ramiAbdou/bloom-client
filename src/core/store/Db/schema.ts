/**
 * @fileoverview Store: Schema
 * - Defines the normalizr schema needed to normalize all of the data based
 * on the relationships of the data. Structures in a way that is very similar
 * to the actual PostgreSQL DB.
 */

import deepmerge from 'deepmerge';
import { schema } from 'normalizr';

import { takeFirst } from '@util/util';

/**
 * Merges the two entities according to the deepmerge strategy, except handles
 * array in a way that produces no duplicates.
 *
 * @param a First entity to merge.
 * @param b Second entity to merge.
 */
export const mergeStrategy = (a: Partial<any>, b: Partial<any>) => {
  const arrayMerge = (target: any[], source: any[]) => {
    const updatedSource = source.filter(
      (value: any) => !target.includes(value)
    );

    // Concat the source to the target.
    return target.concat(updatedSource);
  };

  return deepmerge(a, b, { arrayMerge });
};

// ## NORMALIZR SCHEMA DECLARATIONS

const Community = new schema.Entity(
  'communities',
  {},
  {
    mergeStrategy,
    processStrategy: (community, parent) => {
      const processedData = takeFirst([
        [!!parent.applicationId, { application: parent.id }],
        [!!parent.eventId, { events: [parent.id] }],
        [!!parent.integrationsId, { integrations: parent.id }],
        [!!parent.memberId, { members: [parent.id] }],
        [!!parent.questionId, { questions: [parent.id] }],
        [!!parent.paymentId, { payments: [parent.id] }],
        [!!parent.typeId, { types: [parent.id] }],
        {}
      ]);

      return { ...community, ...processedData };
    }
  }
);

const CommunityApplication = new schema.Entity(
  'applications',
  {},
  {
    processStrategy: (value) => {
      return { ...value, applicationId: value.id };
    }
  }
);

const CommunityIntegrations = new schema.Entity(
  'integrations',
  {},
  {
    processStrategy: (value) => {
      return { ...value, integrationsId: value.id };
    }
  }
);

const Event = new schema.Entity(
  'events',
  {},
  {
    mergeStrategy,
    processStrategy: (value, parent) => {
      const processedData = takeFirst([
        [!!parent.attendeeId, { attendees: [parent.id] }],
        [!!parent.guestId, { guests: [parent.id] }],
        [!!parent.watchId, { watches: [parent.id] }],
        {}
      ]);

      return { ...value, ...processedData, eventId: value.id };
    }
  }
);

const EventAttendee = new schema.Entity(
  'attendees',
  {},
  {
    mergeStrategy,
    processStrategy: (value, parent) => {
      const processedData = takeFirst([
        [!!parent.eventId, { event: parent.id }],
        {}
      ]);

      return { ...value, ...processedData, attendeeId: value.id };
    }
  }
);

const EventGuest = new schema.Entity(
  'guests',
  {},
  {
    mergeStrategy,
    processStrategy: (value, parent) => {
      const processedData = takeFirst([
        [!!parent.eventId, { event: parent.id }],
        {}
      ]);

      return { ...value, ...processedData, guestId: value.id };
    }
  }
);

const EventWatch = new schema.Entity(
  'watches',
  {},
  {
    mergeStrategy,
    processStrategy: (value, parent) => {
      const processedData = takeFirst([
        [!!parent.eventId, { event: parent.id }],
        {}
      ]);

      return { ...value, ...processedData, watchId: value.id };
    }
  }
);

const Member = new schema.Entity(
  'members',
  {},
  {
    mergeStrategy,
    processStrategy: (value, parent) => {
      const processedData = takeFirst([
        [!!parent.attendeeId, { attendees: [parent.id] }],
        [!!parent.eventId, { events: [parent.id] }],
        [!!parent.guestId, { guests: [parent.id] }],
        [!!parent.paymentId, { payments: [parent.id] }],
        [!!parent.valueId, { values: [parent.id] }],
        [!!parent.watchId, { watches: [parent.id] }],
        {}
      ]);

      return { ...value, ...processedData, memberId: value.id };
    }
  }
);

const MemberValue = new schema.Entity(
  'values',
  {},
  {
    mergeStrategy,
    processStrategy: (value) => {
      return { ...value, valueId: value.id };
    }
  }
);

const MemberPayment = new schema.Entity(
  'payments',
  {},
  { processStrategy: (value) => ({ ...value, paymentId: value.id }) }
);

const MemberType = new schema.Entity(
  'types',
  {},
  {
    processStrategy: (value) => {
      return { ...value, typeId: value.id };
    }
  }
);

const Question = new schema.Entity(
  'questions',
  {},
  {
    mergeStrategy,
    processStrategy: (value, parent) => {
      const processedData = takeFirst([
        [!!parent.valueId, { values: [parent.id] }]
      ]);

      return { ...value, ...processedData, questionId: value.id };
    }
  }
);

const User = new schema.Entity(
  'users',
  {},
  {
    mergeStrategy,
    processStrategy: (value, parent) => {
      const processedData = takeFirst([
        [!!parent.memberId, { members: [parent.id] }]
      ]);

      return { ...value, ...processedData, userId: value.id };
    }
  }
);

// ## RELATIONSHIPS - Using .define({}) like this handles all of the
// ciruclar dependencies in our code.

Community.define({
  application: CommunityApplication,
  events: [Event],
  highlightedQuestion: Question,
  integrations: CommunityIntegrations,
  members: [Member],
  owner: Member,
  payments: [MemberPayment],
  questions: [Question],
  types: [MemberType]
});

CommunityApplication.define({ community: Community });
CommunityIntegrations.define({ community: Community });

Event.define({
  attendees: [EventAttendee],
  community: Community,
  guests: [EventGuest],
  watches: [EventWatch]
});

EventAttendee.define({ event: Event, member: Member });
EventGuest.define({ event: Event, member: Member });
EventWatch.define({ event: Event, member: Member });

Member.define({
  community: Community,
  guests: [EventGuest],
  payments: [MemberPayment],
  type: MemberType,
  user: User,
  values: [MemberValue],
  watches: [EventWatch]
});

MemberValue.define({ member: Member, question: Question });

MemberPayment.define({
  community: Community,
  member: Member,
  type: MemberType
});

MemberType.define({ community: Community });
Question.define({ community: Community, values: [MemberValue] });
User.define({ members: [Member] });

// We define an object that carries all the schemas to have everything
// centralized and to reduce confusion with the Interface declarations
// (ie: ICommunity, IUser, etc).
export const Schema = {
  COMMUNITY: Community,
  COMMUNITY_APPLICATION: CommunityApplication,
  COMMUNITY_INTEGRATIONS: CommunityIntegrations,
  EVENT: Event,
  EVENT_ATTENDEE: EventAttendee,
  EVENT_GUEST: EventGuest,
  EVENT_WATCH: EventWatch,
  MEMBER: Member,
  MEMBER_PAYMENT: MemberPayment,
  MEMBER_TYPE: MemberType,
  MEMBER_VALUE: MemberValue,
  QUESTION: Question,
  USER: User
};
