/**
 * @fileoverview Store: Schema
 * - Defines the normalizr schema needed to normalize all of the data based
 * on the relationships of the data. Structures in a way that is very similar
 * to the actual PostgreSQL DB.
 */

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
  IRankedQuestionSchema,
  ISupporterSchema,
  IUserSchema
} from './db.entities';

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
  supporters: [ISupporterSchema]
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
  supporter: ISupporterSchema
});

IEventGuestSchema.define({
  event: IEventSchema,
  member: IMemberSchema,
  supporter: ISupporterSchema
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
  user: IUserSchema
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

ISupporterSchema.define({
  eventAttendees: [IEventAttendeeSchema],
  eventGuests: [IEventGuestSchema]
});

IUserSchema.define({
  members: [IMemberSchema],
  supporters: [ISupporterSchema]
});

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
  SUPPORTER: ISupporterSchema,
  USER: IUserSchema
};
