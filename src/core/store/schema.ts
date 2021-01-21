/**
 * @fileoverview Store: Schema
 * - Defines the normalizr schema needed to normalize all of the data based
 * on the relationships of the data. Structures in a way that is very similar
 * to the actual PostgreSQL DB.
 */

import { schema } from 'normalizr';

import { takeFirst } from '@util/util';
import { isEvent, isMemberPayment } from './entities';

// ## NORMALIZR SCHEMA DECLARATIONS

const Community = new schema.Entity(
  'communities',
  {},
  {
    processStrategy: (community, parent) => {
      const processedData = takeFirst([
        [isEvent(parent), { events: [parent.id] }],
        {}
      ]);

      return { ...community, ...processedData };
    }
  }
);

const CommunityApplication = new schema.Entity('applications', {});
const Event = new schema.Entity('events', {});
const EventGuest = new schema.Entity('guests', {});
const Integrations = new schema.Entity('integrations', {});

const Member = new schema.Entity(
  'members',
  {},
  {
    processStrategy: (value, parent) => {
      const processedData = takeFirst([
        [isEvent(parent), { events: [parent.id] }],
        [isMemberPayment(parent), { payments: [parent.id] }],
        {}
      ]);

      return { ...value, ...processedData };
    }
  }
);

const MemberData = new schema.Entity('data', {});
const MemberPayment = new schema.Entity('payments', {});
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

Event.define({ community: Community, guests: [EventGuest] });

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
  EVENT_GUEST: EventGuest,
  INTEGRATIONS: Integrations,
  MEMBER: Member,
  MEMBER_DATA: MemberData,
  MEMBER_PAYMENT: MemberPayment,
  MEMBER_TYPE: MemberType,
  USER: User
};
