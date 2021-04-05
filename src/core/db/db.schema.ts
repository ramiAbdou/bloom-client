/* eslint-disable max-lines */

/**
 * @fileoverview Store: Schema
 * - Defines the normalizr schema needed to normalize all of the data based
 * on the relationships of the data. Structures in a way that is very similar
 * to the actual PostgreSQL DB.
 */

import { schema } from 'normalizr';

import { take } from '@util/util';
import {
  IApplicationSchema,
  ICommunityIntegrationsSchema,
  ICommunitySchema,
  IEventAttendeeSchema,
  IEventGuestSchema,
  IEventSchema,
  IEventWatchSchema,
  IMemberIntegrationsSchema,
  IMemberSchema,
  IMemberSocialsSchema,
  IMemberTypeSchema,
  IMemberValueSchema,
  IPaymentSchema,
  IQuestionSchema,
  IRankedQuestionSchema
} from './db.entities';
import { mergeStrategy } from './db.util';

// ## NORMALIZR SCHEMA DECLARATIONS

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

IApplicationSchema.define({
  community: ICommunitySchema,
  rankedQuestions: [IRankedQuestionSchema]
});

ICommunitySchema.define({
  application: IApplicationSchema,
  communityIntegrations: ICommunityIntegrationsSchema,
  events: [IEventSchema],
  highlightedQuestion: IQuestionSchema,
  memberTypes: [IMemberTypeSchema],
  members: [IMemberSchema],
  owner: IMemberSchema,
  payments: [IPaymentSchema],
  questions: [IQuestionSchema],
  supporters: [Supporter]
});

ICommunityIntegrationsSchema.define({ community: ICommunitySchema });

IEventSchema.define({
  community: ICommunitySchema,
  eventAttendees: [IEventAttendeeSchema],
  eventGuests: [IEventGuestSchema],
  eventWatches: [IEventWatchSchema]
});

IEventAttendeeSchema.define({
  event: IEventSchema,
  member: IMemberSchema,
  supporter: Supporter
});

IEventGuestSchema.define({
  event: IEventSchema,
  member: IMemberSchema,
  supporter: Supporter
});

IEventWatchSchema.define({ event: IEventSchema, member: IMemberSchema });

IMemberSchema.define({
  community: ICommunitySchema,
  eventAttendees: [IEventAttendeeSchema],
  eventGuests: [IEventGuestSchema],
  eventWatches: [IEventWatchSchema],
  memberIntegrations: IMemberIntegrationsSchema,
  memberSocials: IMemberSocialsSchema,
  memberType: IMemberTypeSchema,
  memberValues: [IMemberValueSchema],
  payments: [IPaymentSchema],
  user: User
});

IMemberIntegrationsSchema.define({ member: IMemberSchema });

IMemberSocialsSchema.define({ member: IMemberSchema });

IMemberTypeSchema.define({ community: ICommunitySchema });

IMemberValueSchema.define({ member: IMemberSchema, question: IQuestionSchema });

IPaymentSchema.define({
  community: ICommunitySchema,
  member: IMemberSchema,
  memberType: IMemberTypeSchema
});

IQuestionSchema.define({
  community: ICommunitySchema,
  memberValues: [IMemberValueSchema]
});

IRankedQuestionSchema.define({
  application: IApplicationSchema,
  question: IQuestionSchema
});

Supporter.define({
  eventAttendees: [IEventAttendeeSchema],
  eventGuests: [IEventGuestSchema]
});

User.define({ members: [IMemberSchema], supporters: [Supporter] });

// We define an object that carries all the schemas to have everything
// centralized and to reduce confusion with the Interface declarations
// (ie: ICommunity, IUser, etc).
export const Schema = {
  APPLICATION: IApplicationSchema,
  COMMUNITY: ICommunitySchema,
  COMMUNITY_INTEGRATIONS: ICommunityIntegrationsSchema,
  EVENT: IEventSchema,
  EVENT_ATTENDEE: IEventAttendeeSchema,
  EVENT_GUEST: IEventGuestSchema,
  EVENT_WATCH: IEventWatchSchema,
  MEMBER: IMemberSchema,
  MEMBER_INTEGRATIONS: IMemberIntegrationsSchema,
  MEMBER_SOCIALS: IMemberSocialsSchema,
  MEMBER_TYPE: IMemberTypeSchema,
  MEMBER_VALUE: IMemberValueSchema,
  PAYMENT: IPaymentSchema,
  QUESTION: IQuestionSchema,
  RANKED_QUESTION: IRankedQuestionSchema,
  USER: User
};
