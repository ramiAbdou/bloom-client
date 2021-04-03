/* eslint-disable max-lines */

/**
 * @fileoverview Store: Schema
 * - Defines the normalizr schema needed to normalize all of the data based
 * on the relationships of the data. Structures in a way that is very similar
 * to the actual PostgreSQL DB.
 */

import deepmerge from 'deepmerge';
import { schema } from 'normalizr';

import { take } from '@util/util';

/**
 * Merges the two entities according to the deepmerge strategy, except handles
 * array in a way that produces no duplicates.
 *
 * @param a First entity to merge.
 * @param b Second entity to merge.
 */
export const mergeStrategy = (a: Partial<any>, b: Partial<any>): any => {
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

const Application = new schema.Entity(
  'applications',
  {},
  {
    mergeStrategy,
    processStrategy: (value, parent) => {
      const processedData = take([
        [!!parent.rankedQuestionId, { questions: [parent.id] }]
      ]);

      return { ...value, ...processedData, applicationId: value.id };
    }
  }
);

const Community = new schema.Entity(
  'communities',
  {},
  {
    mergeStrategy,
    processStrategy: (community, parent) => {
      const processedData = take([
        [!!parent.applicationId, { application: parent.id }],
        [
          !!parent.communityIntegrationsId,
          { communityIntegrations: parent.id }
        ],
        [!!parent.eventId, { events: [parent.id] }],
        [!!parent.memberId, { members: [parent.id] }],
        [!!parent.memberTypeId, { memberTypes: [parent.id] }],
        [!!parent.paymentId, { payments: [parent.id] }],
        [!!parent.questionId, { questions: [parent.id] }]
      ]);

      return { ...community, ...processedData };
    }
  }
);

const CommunityIntegrations = new schema.Entity(
  'communityIntegrations',
  {},
  {
    processStrategy: (value) => {
      return {
        ...value,
        communityIntegrationsId: value.id
      };
    }
  }
);

const Event = new schema.Entity(
  'events',
  {},
  {
    mergeStrategy,
    processStrategy: (value, parent) => {
      const processedData = take([
        [!!parent.eventAttendeeId, { eventAttendees: [parent.id] }],
        [!!parent.eventGuestId, { eventGuests: [parent.id] }],
        [!!parent.eventWatchId, { eventWatches: [parent.id] }]
      ]);

      return { ...value, ...processedData, eventId: value.id };
    }
  }
);

const EventAttendee = new schema.Entity(
  'eventAttendees',
  {},
  {
    mergeStrategy,
    processStrategy: (value, parent) => {
      const processedData = take([[!!parent.eventId, { event: parent.id }]]);

      return { ...value, ...processedData, eventAttendeeId: value.id };
    }
  }
);

const EventGuest = new schema.Entity(
  'eventGuests',
  {},
  {
    mergeStrategy,
    processStrategy: (value, parent) => {
      const processedData = take([[!!parent.eventId, { event: parent.id }]]);

      return { ...value, ...processedData, eventGuestId: value.id };
    }
  }
);

const EventWatch = new schema.Entity(
  'eventWatches',
  {},
  {
    mergeStrategy,
    processStrategy: (value, parent) => {
      const processedData = take([[!!parent.eventId, { event: parent.id }]]);

      return { ...value, ...processedData, eventWatchId: value.id };
    }
  }
);

const Member = new schema.Entity(
  'members',
  {},
  {
    mergeStrategy,
    processStrategy: (value, parent) => {
      const processedData = take([
        [!!parent.eventAttendeeId, { eventAttendees: [parent.id] }],
        [!!parent.eventGuestId, { eventGuests: [parent.id] }],
        [!!parent.eventId, { events: [parent.id] }],
        [!!parent.eventWatchId, { eventWatches: [parent.id] }],
        [!!parent.memberValueId, { memberValues: [parent.id] }],
        [!!parent.paymentId, { payments: [parent.id] }]
      ]);

      return { ...value, ...processedData, memberId: value.id };
    }
  }
);

const MemberIntegrations = new schema.Entity(
  'memberIntegrations',
  {},
  {
    processStrategy: (value) => {
      return { ...value, memberIntegrationsId: value.id };
    }
  }
);

const MemberSocials = new schema.Entity(
  'memberSocials',
  {},
  {
    mergeStrategy,
    processStrategy: (value) => {
      return { ...value, memberSocialsId: value.id };
    }
  }
);

const MemberType = new schema.Entity(
  'memberTypes',
  {},
  {
    processStrategy: (value) => {
      return { ...value, memberTypeId: value.id };
    }
  }
);

const MemberValue = new schema.Entity(
  'memberValues',
  {},
  {
    mergeStrategy,
    processStrategy: (value) => {
      return { ...value, memberValueId: value.id };
    }
  }
);

const Payment = new schema.Entity(
  'payments',
  {},
  {
    processStrategy: (value) => {
      return { ...value, paymentId: value.id };
    }
  }
);

const Question = new schema.Entity(
  'questions',
  {},
  {
    mergeStrategy,
    processStrategy: (value, parent) => {
      const processedData = take([
        [!!parent.memberValueId, { memberValues: [parent.id] }]
      ]);

      return { ...value, ...processedData, questionId: value.id };
    }
  }
);

const RankedQuestion = new schema.Entity(
  'rankedQuestions',
  {},
  {
    processStrategy: (value) => {
      return { ...value, rankedQuestionId: value.id };
    }
  }
);

const Supporter = new schema.Entity(
  'supporters',
  {},
  {
    processStrategy: (value, parent) => {
      const processedData = take([
        [!!parent.eventAttendeeId, { eventAttendees: [parent.id] }],
        [!!parent.eventGuestId, { eventGuests: [parent.id] }],
        [!!parent.eventWatchId, { eventWatches: [parent.id] }]
      ]);

      return { ...value, ...processedData, supporterId: value.id };
    }
  }
);

const User = new schema.Entity(
  'users',
  {},
  {
    mergeStrategy,
    processStrategy: (value, parent) => {
      const processedData = take([
        [!!parent.memberId, { members: [parent.id] }]
      ]);

      return { ...value, ...processedData, userId: value.id };
    }
  }
);

// ## RELATIONSHIPS - Using .define({}) like this handles all of the
// ciruclar dependencies in our code.

Application.define({ community: Community, rankedQuestions: [RankedQuestion] });

Community.define({
  application: Application,
  communityIntegrations: CommunityIntegrations,
  events: [Event],
  highlightedQuestion: Question,
  memberTypes: [MemberType],
  members: [Member],
  owner: Member,
  payments: [Payment],
  questions: [Question],
  supporters: [Supporter]
});

CommunityIntegrations.define({ community: Community });

Event.define({
  community: Community,
  eventAttendees: [EventAttendee],
  eventGuests: [EventGuest],
  eventWatches: [EventWatch]
});

EventAttendee.define({ event: Event, member: Member, supporter: Supporter });

EventGuest.define({ event: Event, member: Member, supporter: Supporter });

EventWatch.define({ event: Event, member: Member });

Member.define({
  community: Community,
  eventAttendees: [EventAttendee],
  eventGuests: [EventGuest],
  eventWatches: [EventWatch],
  memberIntegrations: MemberIntegrations,
  memberSocials: MemberSocials,
  memberType: MemberType,
  memberValues: [MemberValue],
  payments: [Payment],
  user: User
});

MemberIntegrations.define({ member: Member });

MemberSocials.define({ member: Member });

MemberType.define({ community: Community });

MemberValue.define({ member: Member, question: Question });

Payment.define({
  community: Community,
  member: Member,
  memberType: MemberType
});

Question.define({ community: Community, memberValues: [MemberValue] });

RankedQuestion.define({ application: Application, question: Question });

Supporter.define({
  eventAttendees: [EventAttendee],
  eventGuests: [EventGuest]
});

User.define({ members: [Member], supporters: [Supporter] });

// We define an object that carries all the schemas to have everything
// centralized and to reduce confusion with the Interface declarations
// (ie: ICommunity, IUser, etc).
export const Schema = {
  APPLICATION: Application,
  APPLICATION_QUESTION: RankedQuestion,
  COMMUNITY: Community,
  COMMUNITY_INTEGRATIONS: CommunityIntegrations,
  EVENT: Event,
  EVENT_ATTENDEE: EventAttendee,
  EVENT_GUEST: EventGuest,
  EVENT_WATCH: EventWatch,
  MEMBER: Member,
  MEMBER_INTEGRATIONS: MemberIntegrations,
  MEMBER_SOCIALS: MemberSocials,
  MEMBER_TYPE: MemberType,
  MEMBER_VALUE: MemberValue,
  PAYMENT: Payment,
  QUESTION: Question,
  USER: User
};
