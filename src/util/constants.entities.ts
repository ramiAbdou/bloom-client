/* eslint-disable max-lines */
/* eslint-disable max-classes-per-file */

import {
  AggregateCount,
  QuestionCategory,
  QuestionType
} from '@util/constants';

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

  // RELATIONSHIPS

  community: ICommunity;

  communityId: string;

  rankedQuestions: IRankedQuestion[];
}

// ## COMMUNITY

export class ICommunity extends BaseEntity {
  canCollectDues: boolean;

  logoUrl: string;

  knowledgeHubUrl?: string;

  name: string;

  primaryColor: string;

  urlName: string;

  // RELATIONSHIPS

  application?: IApplication;

  communityIntegrations: ICommunityIntegrations;

  events: IEvent[];

  highlightedQuestion: IQuestion;

  highlightedQuestionId: string;

  memberTypes: IMemberType[];

  members: IMember[];

  payments: IPayment[];

  questions: IQuestion[];

  supporters: ISupporter[];
}

// ## COMMUNITY INTEGRATIONS

export class ICommunityIntegrations extends BaseEntity {
  isMailchimpAuthenticated: boolean;

  mailchimpLists: { name: string; id: string }[];

  mailchimpListId: string;

  mailchimpListName: string;

  stripeAccountId: string;

  // RELATIONSHIPS

  community: ICommunity;

  communityId: string;
}

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

  // RELATIONSHIPS

  community: ICommunity;

  communityId: string;

  eventAttendees: IEventAttendee[];

  eventAttendeesAggregate?: AggregateCount;

  eventGuests: IEventGuest[];

  eventGuestsAggregate?: AggregateCount;

  eventWatches: IEventWatch[];

  eventWatchesAggregate?: AggregateCount;
}

// ## EVENT ATTENDEE

export class IEventAttendee extends BaseEntity {
  // RELATIONSHIPS

  event: IEvent;

  eventId: string;

  member?: IMember;

  memberId?: string;

  supporter?: ISupporter;

  supporterId?: string;
}

// ## EVENT GUEST

export class IEventGuest extends BaseEntity {
  // RELATIONSHIPS

  event: IEvent;

  eventId: string;

  member?: IMember;

  memberId?: string;

  supporter?: ISupporter;

  supporterId?: string;
}

// ## EVENT WATCH

export class IEventWatch extends BaseEntity {
  // RELATIONSHIPS

  event: IEvent;

  eventId: string;

  member: IMember;

  memberId: string;
}

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

  fullName: string;

  joinedAt?: string;

  lastName: string;

  pictureUrl?: string;

  position?: string;

  role?: MemberRole;

  status: MemberStatus;

  // RELATIONSHIPS

  community: ICommunity;

  communityId: string;

  eventAttendees: IEventAttendee[];

  eventGuests: IEventGuest[];

  eventWatches: IEventWatch[];

  memberIntegrations: IMemberIntegrations;

  memberSocials: IMemberSocials;

  memberType: IMemberType;

  memberTypeId: string;

  memberValues: IMemberValue[];

  payments: IPayment[];

  user: IUser;

  userId: string;
}

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

  // RELATIONSHIPS

  member: IMember;

  memberId: string;
}

// MEMBER SOCIALS

export class IMemberSocials extends BaseEntity {
  facebookUrl: string;

  instagramUrl: string;

  linkedInUrl: string;

  twitterUrl: string;

  // RELATIONSHIPS

  member: IMember;

  memberId: string;
}

// ## MEMBER TYPE

export enum RecurrenceType {
  MONTHLY = 'Monthly',
  YEARLY = 'Yearly'
}

export class IMemberType extends BaseEntity {
  amount: number;

  name: string;

  recurrence: RecurrenceType;

  // RELATIONSHIPS

  community: ICommunity;

  communityId: string;
}

// ## MEMBER VALUE

export class IMemberValue extends BaseEntity {
  value: string;

  // RELATIONSHIPS

  member: IMember;

  memberId: string;

  question: IQuestion;

  questionId: string;
}

// ## PAYMENT

export enum PaymentType {
  DONATION = 'DONATION',
  DUES = 'DUES'
}

export class IPayment extends BaseEntity {
  amount: number;

  stripeInvoiceUrl: string;

  type: PaymentType;

  // RELATIONSHIPS

  member: IMember;

  memberId: string;

  memberType: IMemberType;

  memberTypeId: string;
}

// ## QUESTION

export class IQuestion extends BaseEntity {
  category: QuestionCategory;

  locked: boolean;

  options: string[];

  rank?: number;

  required: boolean;

  title: string;

  type: QuestionType;

  // RELATIONSHIPS

  community: ICommunity;

  communityId: string;

  memberValues?: IMemberValue[];
}

// RANKED QUESTION

export class IRankedQuestion extends BaseEntity {
  rank: number;

  // RELATIONSHIPS

  application?: IApplication;

  applicationId?: string;

  question: IQuestion;

  questionId: string;
}

// ## SUPPORTER

export class ISupporter extends BaseEntity {
  email: string;

  firstName: string;

  lastName: string;

  pictureUrl: string;

  // RELATIONSHIPS

  eventAttendees: IEventAttendee[];

  eventGuests: IEventGuest[];

  eventWatches: IEventWatch[];
}

// ## USER

export class IUser extends BaseEntity {
  email: string;

  // RELATIONSHIPS

  members: IMember[];

  supporters: ISupporter[];
}
