/* eslint-disable max-lines */

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

export interface BaseEntity {
  createdAt: string;
  deletedAt?: string;
  id: Identifier;
  updatedAt: string;
}

// ## APPLICATION

export interface IApplication extends BaseEntity {
  description: string;
  title: string;

  community: Identifier;
  questions: Identifier[];
}

export const IApplicationSchema: schema.Entity<IApplication> = new schema.Entity(
  'applications',
  {},
  {
    mergeStrategy,
    processStrategy: (application, parent): IApplication => {
      const processedData: Partial<IApplication> = take([
        [!!parent.rankedQuestionId, { questions: [parent.id] }]
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

export interface ICommunity extends BaseEntity {
  canCollectDues: boolean;
  logoUrl: string;
  knowledgeHubUrl?: string;
  name: string;
  primaryColor: string;
  urlName: string;

  application?: Identifier;
  communityIntegrations: Identifier;
  events?: Identifier[];
  highlightedQuestion: Identifier;
  memberTypes: Identifier[];
  members: Identifier[];
  payments: Identifier[];
  questions: Identifier[];
  owner?: Identifier;
  supporters: Identifier[];
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

export interface ICommunityIntegrations extends BaseEntity {
  isMailchimpAuthenticated: boolean;
  mailchimpLists: { name: string; id: string }[];
  mailchimpListId: string;
  mailchimpListName: string;
  stripeAccountId: string;

  community: Identifier;
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

export interface IEvent extends BaseEntity {
  description: string;
  endTime: string;
  imageUrl?: string;
  privacy: EventPrivacy;
  recordingUrl?: string;
  startTime: string;
  summary?: string;
  title: string;
  videoUrl: string;

  community: Identifier;
  eventAttendees: Identifier[];
  eventGuests: Identifier[];
  eventInvitees?: Identifier[];
  eventWatches: Identifier[];
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

export interface IEventAttendee extends BaseEntity {
  event: Identifier;
  member?: Identifier;
  supporter?: Identifier;
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

export interface IEventGuest extends BaseEntity {
  event: Identifier;
  member?: Identifier;
  supporter?: Identifier;
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

export interface IEventWatch extends BaseEntity {
  event: Identifier;
  member: Identifier;
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

export interface IMember extends BaseEntity {
  bio?: string;
  email: string;
  firstName: string;
  joinedAt?: string;
  lastName: string;
  pictureUrl?: string;
  position?: string;
  role?: MemberRole;
  status: MemberStatus;

  community: Identifier;
  eventAttendees: Identifier[];
  eventGuests: Identifier[];
  eventWatches: Identifier[];
  memberIntegrations: Identifier;
  memberSocials: Identifier;
  memberType: Identifier;
  memberValues: Identifier[];
  payments: Identifier[];
  user: Identifier;
}

export const IMemberSchema: schema.Entity<IMember> = new schema.Entity(
  'members',
  {},
  {
    mergeStrategy,
    processStrategy: (member, parent): IMember => {
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

export interface IMemberIntegrations extends BaseEntity {
  paymentMethod: IPaymentMethod;
  renewalDate?: string;
  stripeSubscriptionId?: string;

  member: Identifier;
}

export const IMemberIntegrationsSchema = new schema.Entity(
  'memberIntegrations',
  {},
  {
    processStrategy: (memberIntegrations): IMemberIntegrations => {
      return {
        ...memberIntegrations,
        memberIntegrationsId: memberIntegrations.id
      };
    }
  }
);

// MEMBER SOCIALS

export interface IMemberSocials extends BaseEntity {
  facebookUrl: string;
  instagramUrl: string;
  linkedInUrl: string;
  twitterUrl: string;

  member: Identifier;
}

export const IMemberSocialsSchema: schema.Entity<IMemberSocials> = new schema.Entity(
  'memberSocials',
  {},
  {
    mergeStrategy,
    processStrategy: (memberSocials): IMemberSocials => {
      return { ...memberSocials, memberSocialsId: memberSocials.id };
    }
  }
);

// ## MEMBER TYPE

export enum RecurrenceType {
  MONTHLY = 'Monthly',
  YEARLY = 'Yearly'
}

export interface IMemberType extends BaseEntity {
  amount: number;
  name: string;
  recurrence: RecurrenceType;
}

export const IMemberTypeSchema: schema.Entity<IMemberType> = new schema.Entity(
  'memberTypes',
  {},
  {
    processStrategy: (memberType): IMemberType => {
      return { ...memberType, memberTypeId: memberType.id };
    }
  }
);

// ## MEMBER VALUE

export interface IMemberValue extends BaseEntity {
  value: string;

  member: Identifier;
  question: Identifier;
}

export const IMemberValueSchema: schema.Entity<IMemberValue> = new schema.Entity(
  'memberValues',
  {},
  {
    mergeStrategy,
    processStrategy: (memberValue): IMemberValue => {
      return { ...memberValue, memberValueId: memberValue.id };
    }
  }
);

// ## PAYMENT

export enum PaymentType {
  DONATION = 'DONATION',
  DUES = 'DUES'
}

export interface IPayment extends BaseEntity {
  amount: number;
  stripeInvoiceUrl: string;
  type: PaymentType;

  member: Identifier;
  memberType: Identifier;
}

export const IPaymentSchema: schema.Entity<IPayment> = new schema.Entity(
  'payments',
  {},
  {
    processStrategy: (payment): IPayment => {
      return { ...payment, paymentId: payment.id };
    }
  }
);

// ## QUESTION

export interface IQuestion extends BaseEntity {
  category: QuestionCategory;
  locked: boolean;
  options: string[];
  rank?: number;
  required: boolean;
  title: QuestionType;
  type: QuestionType;

  memberValues?: Identifier[];
}

export const IQuestionSchema: schema.Entity<IQuestion> = new schema.Entity(
  'questions',
  {},
  {
    mergeStrategy,
    processStrategy: (question, parent): IQuestion => {
      const processedData = take([
        [!!parent.memberValueId, { memberValues: [parent.id] }]
      ]);

      return { ...question, ...processedData, questionId: question.id };
    }
  }
);

// RANKED QUESTION

export interface IRankedQuestion extends BaseEntity {
  rank: number;

  application?: Identifier;
  question: Identifier;
}

export const IRankedQuestionSchema: schema.Entity<IRankedQuestion> = new schema.Entity(
  'rankedQuestions',
  {},
  {
    processStrategy: (rankedQuestion): IRankedQuestion => {
      return { ...rankedQuestion, rankedQuestionId: rankedQuestion.id };
    }
  }
);

// ## SUPPORTER

export interface ISupporter extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  pictureUrl: string;
}

// ## USER

export interface IUser extends BaseEntity {
  email: string;
  members: Identifier[];
  supporters: Identifier[];
}

export interface EntityRecord<T> {
  activeId?: string;
  byId: Record<string, T>;
}

export interface IEntities {
  applications: EntityRecord<IApplication>;
  communities: EntityRecord<ICommunity>;
  communityIntegrations: EntityRecord<ICommunityIntegrations>;
  eventAttendees: EntityRecord<IEventAttendee>;
  eventGuests: EntityRecord<IEventGuest>;
  eventWatches: EntityRecord<IEventWatch>;
  events: EntityRecord<IEvent>;
  members: EntityRecord<IMember>;
  memberIntegrations: EntityRecord<IMemberIntegrations>;
  memberSocials: EntityRecord<IMemberSocials>;
  memberTypes: EntityRecord<IMemberType>;
  memberValues: EntityRecord<IMemberValue>;
  payments: EntityRecord<IPayment>;
  questions: EntityRecord<IQuestion>;
  rankedQuestions: EntityRecord<IRankedQuestion>;
  supporters: EntityRecord<ISupporter>;
  users: EntityRecord<IUser>;
}

// Initial state for all of the entity (DB) definitions.
export const initialEntities: IEntities = {
  applications: { byId: {} },
  communities: { activeId: null, byId: {} },
  communityIntegrations: { byId: {} },
  eventAttendees: { byId: {} },
  eventGuests: { byId: {} },
  eventWatches: { byId: {} },
  events: { activeId: null, byId: {} },
  memberIntegrations: { byId: {} },
  memberSocials: { byId: {} },
  memberTypes: { byId: {} },
  memberValues: { byId: {} },
  members: { activeId: null, byId: {} },
  payments: { byId: {} },
  questions: { byId: {} },
  rankedQuestions: { byId: {} },
  supporters: { byId: {} },
  users: { activeId: null, byId: {} }
};
