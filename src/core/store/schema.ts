/**
 * @fileoverview Store: Schema
 * - Defines the normalizr schema needed to normalize all of the data based
 * on the relationships of the data. Structures in a way that is very similar
 * to the actual PostgreSQL DB.
 */

import deepmerge from 'deepmerge';
import { schema } from 'normalizr';

import { takeFirst } from '@util/util';

// ## NORMALIZR SCHEMA DECLARATIONS

const Community = new schema.Entity(
  'communities',
  {},
  {
    mergeStrategy: deepmerge,
    processStrategy: (community, parent) => {
      const processedData = takeFirst([
        [!!parent.eventId, { events: [parent.id] }],
        {}
      ]);

      return { ...community, ...processedData };
    }
  }
);

const CommunityApplication = new schema.Entity('applications', {});

const Event = new schema.Entity(
  'events',
  {},
  {
    processStrategy: (value, parent) => {
      const processedData = takeFirst([
        [!!parent.attendeeId, { attendees: [parent.id] }],
        [!!parent.guestId, { guests: [parent.id] }],
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
    processStrategy: (value, parent) => {
      const processedData = takeFirst([
        [!!parent.eventId, { event: parent.id }],
        {}
      ]);

      return { ...value, ...processedData, guestId: value.id };
    }
  }
);

const Integrations = new schema.Entity('integrations', {});

const Member = new schema.Entity(
  'members',
  {},
  {
    mergeStrategy: deepmerge,
    processStrategy: (value, parent) => {
      const processedData = takeFirst([
        [!!parent.attendeeId, { attendees: [parent.id] }],
        [!!parent.eventId, { events: [parent.id] }],
        [!!parent.guestId, { guests: [parent.id] }],
        [!!parent.paymentId, { payments: [parent.id] }],
        {}
      ]);

      return { ...value, ...processedData };
    }
  }
);

const MemberData = new schema.Entity('data', {});

const MemberPayment = new schema.Entity(
  'payments',
  {},
  { processStrategy: (value) => ({ ...value, paymentId: value.id }) }
);

const MemberType = new schema.Entity('types', {});
const Question = new schema.Entity('questions', {});
const User = new schema.Entity('users', {});

// ## RELATIONSHIPS - Using .define({}) like this handles all of the
// ciruclar dependencies in our code.

Community.define({
  application: CommunityApplication,
  events: [Event],
  integrations: Integrations,
  members: [Member],
  payments: [MemberPayment],
  questions: [Question],
  types: [MemberType]
});

Event.define({
  attendees: [EventAttendee],
  community: Community,
  guests: [EventGuest]
});

EventAttendee.define({ event: Event, member: Member });
EventGuest.define({ event: Event, member: Member });

Member.define({
  community: Community,
  data: [MemberData],
  guests: [EventGuest],
  payments: [MemberPayment],
  type: MemberType,
  user: User
});

MemberData.define({ question: Question });
MemberPayment.define({ member: Member, type: MemberType });
User.define({ members: [Member] });

// We define an object that carries all the schemas to have everything
// centralized and to reduce confusion with the Interface declarations
// (ie: ICommunity, IUser, etc).
export const Schema = {
  COMMUNITY: Community,
  EVENT: Event,
  EVENT_ATTENDEE: EventAttendee,
  EVENT_GUEST: EventGuest,
  INTEGRATIONS: Integrations,
  MEMBER: Member,
  MEMBER_DATA: MemberData,
  MEMBER_PAYMENT: MemberPayment,
  MEMBER_TYPE: MemberType,
  USER: User
};
