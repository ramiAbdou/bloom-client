/* eslint-disable max-lines */
/* eslint-disable max-classes-per-file */

import deepmerge from 'deepmerge';
import { schema } from 'normalizr';

import { QuestionCategory, QuestionType } from '@util/constants';
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

export type Identifier = string;

export class BaseEntity {
  createdAt: string;

  deletedAt?: string;

  id: Identifier;

  updatedAt: string;
}

// ## APPLICATION

export class IApplication extends BaseEntity {
  description: string;

  title: string;

  community: ICommunity;

  rankedQuestions: IRankedQuestion[];
}

export const IApplicationSchema: schema.Entity<IApplication> = new schema.Entity(
  'applications',
  {},
  {
    mergeStrategy,
    processStrategy: (application, parent): IApplication => {
      const processedData: Partial<IApplication> = take([
        [!!parent.rankedQuestionId, { rankedQuestions: [parent.id] }]
      ]);

      return {
        ...application,
        ...processedData,
        applicationId: application.id
      };
    }
  }
);

// ## COMMUNITY

export class ICommunity extends BaseEntity {
  canCollectDues: boolean;

  logoUrl: string;

  knowledgeHubUrl?: string;

  name: string;

  primaryColor: string;

  urlName: string;

  application?: IApplication;

  communityIntegrations: ICommunityIntegrations;

  events?: IEvent[];

  highlightedQuestion: IQuestion;

  memberTypes: IMemberType[];

  members: IMember[];

  payments: IPayment[];

  questions: IQuestion[];

  owner?: IMember;

  supporters: ISupporter[];
}

export const ICommunitySchema: schema.Entity<ICommunity> = new schema.Entity(
  'communities',
  {},
  {
    mergeStrategy,
    processStrategy: (community, parent): ICommunity => {
      const processedData: Partial<ICommunity> = take([
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

      return { ...community, ...processedData, communityId: community.id };
    }
  }
);

// ## COMMUNITY INTEGRATIONS

export class ICommunityIntegrations extends BaseEntity {
  isMailchimpAuthenticated: boolean;

  mailchimpLists: { name: string; id: string }[];

  mailchimpListId: string;

  mailchimpListName: string;

  stripeAccountId: string;

  community: ICommunity;
}

export const ICommunityIntegrationsSchema = new schema.Entity(
  'communityIntegrations',
  {},
  {
    processStrategy: (communityIntegrations): ICommunityIntegrations => {
      return {
        ...communityIntegrations,
        communityIntegrationsId: communityIntegrations.id
      };
    }
  }
);

// ## EVENT

export enum EventPrivacy {
  MEMBERS_ONLY = 'Members Only',
  OPEN_TO_ALL = 'Open to All'
}

export class IEvent extends BaseEntity {
  description: string;

  endTime: string;

  imageUrl?: string;

  privacy: EventPrivacy;

  recordingUrl?: string;

  startTime: string;

  summary?: string;

  title: string;

  videoUrl: string;

  community: ICommunity;

  eventAttendees: IEventAttendee[];

  eventGuests: IEventGuest[];

  eventInvitees?: string[];

  eventWatches: IEventWatch[];
}

export const IEventSchema: schema.Entity<IEvent> = new schema.Entity(
  'events',
  {},
  {
    mergeStrategy,
    processStrategy: (event, parent): IEvent => {
      const processedData: Partial<IEvent> = take([
        [!!parent.eventAttendeeId, { eventAttendees: [parent.id] }],
        [!!parent.eventGuestId, { eventGuests: [parent.id] }],
        [!!parent.eventInviteeId, { eventInvitees: [parent.id] }],
        [!!parent.eventWatchId, { eventWatches: [parent.id] }]
      ]);

      return { ...event, ...processedData, eventId: event.id };
    }
  }
);

// ## EVENT ATTENDEE

export class IEventAttendee extends BaseEntity {
  event: IEvent;

  member?: IMember;

  supporter?: ISupporter;
}

export const IEventAttendeeSchema: schema.Entity<IEventAttendee> = new schema.Entity(
  'eventAttendees',
  {},
  {
    mergeStrategy,
    processStrategy: (eventAttendee: IEventAttendee) => {
      return {
        ...eventAttendee,
        eventAttendeeId: eventAttendee.id
      };
    }
  }
);

// ## EVENT GUEST

export class IEventGuest extends BaseEntity {
  event: IEvent;

  member?: IMember;

  supporter?: ISupporter;
}

export const IEventGuestSchema: schema.Entity<IEventGuest> = new schema.Entity(
  'eventGuests',
  {},
  {
    mergeStrategy,
    processStrategy: (eventGuest): IEventGuest => {
      return { ...eventGuest, eventGuestId: eventGuest.id };
    }
  }
);

// ## EVENT WATCH

export class IEventWatch extends BaseEntity {
  event: IEvent;

  member: IMember;
}

export const IEventWatchSchema: schema.Entity<IEventWatch> = new schema.Entity(
  'eventWatches',
  {},
  {
    mergeStrategy,
    processStrategy: (eventWatch): IEventWatch => {
      return { ...eventWatch, eventWatchId: eventWatch.id };
    }
  }
);

// ## MEMBER

export enum MemberRole {
  ADMIN = 'Admin',
  OWNER = 'Owner'
}

export enum MemberStatus {
  ACCEPTED = 'Accepted',
  INVITED = 'Invited',
  PENDING = 'Pending',
  REJECTED = 'Rejected'
}

export class IMember extends BaseEntity {
  bio?: string;

  email: string;

  firstName: string;

  joinedAt?: string;

  lastName: string;

  pictureUrl?: string;

  position?: string;

  role?: MemberRole;

  status: MemberStatus;

  community: ICommunity;

  eventAttendees: IEventAttendee[];

  eventGuests: IEventGuest[];

  eventWatches: IEventWatch[];

  memberIntegrations: IMemberIntegrations;

  memberSocials: IMemberSocials;

  memberType: IMemberType;

  memberValues: IMemberValue[];

  payments: IPayment[];

  user: IUser;
}

export const IMemberSchema: schema.Entity<IMember> = new schema.Entity(
  'members',
  {},
  {
    mergeStrategy,
    processStrategy: (member: IMember, parent) => {
      const processedData: Partial<IMember> = take([
        [!!parent.eventAttendeeId, { eventAttendees: [parent.id] }],
        [!!parent.eventGuestId, { eventGuests: [parent.id] }],
        [!!parent.eventId, { events: [parent.id] }],
        [!!parent.eventWatchId, { eventWatches: [parent.id] }],
        [!!parent.memberIntegrationsId, { memberIntegrations: parent.id }],
        [!!parent.memberValueId, { memberValues: [parent.id] }],
        [!!parent.paymentId, { payments: [parent.id] }]
      ]);

      return { ...member, ...processedData, memberId: member.id };
    }
  }
);

// ## MEMBER INTEGRATIONS

export interface IPaymentMethod {
  brand: string;
  expirationDate: string;
  last4: string;
  paymentMethodId?: string;
  zipCode: string;
}

export class IMemberIntegrations extends BaseEntity {
  paymentMethod: IPaymentMethod;

  renewalDate?: string;

  stripeSubscriptionId?: string;

  member: IMember;
}

export const IMemberIntegrationsSchema = new schema.Entity(
  'memberIntegrations',
  {},
  {
    processStrategy: (memberIntegrations: IMemberIntegrations) => {
      return {
        ...memberIntegrations,
        memberIntegrationsId: memberIntegrations.id
      };
    }
  }
);

// MEMBER SOCIALS

export class IMemberSocials extends BaseEntity {
  facebookUrl: string;

  instagramUrl: string;

  linkedInUrl: string;

  twitterUrl: string;

  member: IMember;
}

export const IMemberSocialsSchema: schema.Entity<IMemberSocials> = new schema.Entity(
  'memberSocials',
  {},
  {
    mergeStrategy,
    processStrategy: (memberSocials: IMemberSocials) => {
      return { ...memberSocials, memberSocialsId: memberSocials.id };
    }
  }
);

// ## MEMBER TYPE

export enum RecurrenceType {
  MONTHLY = 'Monthly',
  YEARLY = 'Yearly'
}

export class IMemberType extends BaseEntity {
  amount: number;

  name: string;

  recurrence: RecurrenceType;
}

export const IMemberTypeSchema: schema.Entity<IMemberType> = new schema.Entity(
  'memberTypes',
  {},
  {
    processStrategy: (memberType: IMemberType) => {
      return { ...memberType, memberTypeId: memberType.id };
    }
  }
);

// ## MEMBER VALUE

export class IMemberValue extends BaseEntity {
  value: string;

  member: IMember;

  question: IQuestion;
}

export const IMemberValueSchema: schema.Entity<IMemberValue> = new schema.Entity(
  'memberValues',
  {},
  {
    mergeStrategy,
    processStrategy: (memberValue: IMemberValue) => {
      return { ...memberValue, memberValueId: memberValue.id };
    }
  }
);

// ## PAYMENT

export enum PaymentType {
  DONATION = 'DONATION',
  DUES = 'DUES'
}

export class IPayment extends BaseEntity {
  amount: number;

  stripeInvoiceUrl: string;

  type: PaymentType;

  member: IMember;

  memberType: IMemberType;
}

export const IPaymentSchema: schema.Entity<IPayment> = new schema.Entity(
  'payments',
  {},
  {
    processStrategy: (payment: IPayment) => {
      return { ...payment, paymentId: payment.id };
    }
  }
);

// ## QUESTION

export class IQuestion extends BaseEntity {
  category: QuestionCategory;

  locked: boolean;

  options: string[];

  rank?: number;

  required: boolean;

  title: string;

  type: QuestionType;

  memberValues?: IMemberValue[];
}

export const IQuestionSchema: schema.Entity<IQuestion> = new schema.Entity(
  'questions',
  {},
  {
    mergeStrategy,
    processStrategy: (question: IQuestion, parent) => {
      const processedData = take([
        [!!parent.memberValueId, { memberValues: [parent.id] }]
      ]);

      return { ...question, ...processedData, questionId: question.id };
    }
  }
);

// RANKED QUESTION

export class IRankedQuestion extends BaseEntity {
  rank: number;

  application?: IApplication;

  question: IQuestion;
}

export const IRankedQuestionSchema: schema.Entity<IRankedQuestion> = new schema.Entity(
  'rankedQuestions',
  {},
  {
    processStrategy: (rankedQuestion: IRankedQuestion) => {
      return { ...rankedQuestion, rankedQuestionId: rankedQuestion.id };
    }
  }
);

// ## SUPPORTER

export class ISupporter extends BaseEntity {
  email: string;

  firstName: string;

  lastName: string;

  pictureUrl: string;

  eventAttendees: IEventAttendee[];

  eventGuests: IEventGuest[];

  eventWatches: IEventWatch[];
}

export const ISupporterSchema: schema.Entity<ISupporter> = new schema.Entity(
  'supporters',
  {},
  {
    processStrategy: (supporter: ISupporter, parent) => {
      const processedData: Partial<ISupporter> = take([
        [!!parent.eventAttendeeId, { eventAttendees: [parent.id] }],
        [!!parent.eventGuestId, { eventGuests: [parent.id] }],
        [!!parent.eventWatchId, { eventWatches: [parent.id] }]
      ]);

      return { ...supporter, ...processedData, supporterId: supporter.id };
    }
  }
);

// ## USER

export class IUser extends BaseEntity {
  email: string;

  members: IMember[];

  supporters: ISupporter[];
}

export const IUserSchema: schema.Entity<IUser> = new schema.Entity(
  'users',
  {},
  {
    mergeStrategy,
    processStrategy: (value: IUser, parent) => {
      const processedData: Partial<IUser> = take([
        [!!parent.memberId, { members: [parent.id] }]
      ]);

      return { ...value, ...processedData, userId: value.id };
    }
  }
);
