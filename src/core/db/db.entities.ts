/* eslint-disable max-lines */
/* eslint-disable max-classes-per-file */

import { QuestionCategory, QuestionType } from '@util/constants';

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

// ## COMMUNITY INTEGRATIONS

export class ICommunityIntegrations extends BaseEntity {
  isMailchimpAuthenticated: boolean;

  mailchimpLists: { name: string; id: string }[];

  mailchimpListId: string;

  mailchimpListName: string;

  stripeAccountId: string;

  community: ICommunity;
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

  community: ICommunity;

  eventAttendees: IEventAttendee[];

  eventGuests: IEventGuest[];

  eventInvitees?: string[];

  eventWatches: IEventWatch[];
}

// ## EVENT ATTENDEE

export class IEventAttendee extends BaseEntity {
  event: IEvent;

  member?: IMember;

  supporter?: ISupporter;
}

// ## EVENT GUEST

export class IEventGuest extends BaseEntity {
  event: IEvent;

  member?: IMember;

  supporter?: ISupporter;
}

// ## EVENT WATCH

export class IEventWatch extends BaseEntity {
  event: IEvent;

  member: IMember;
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

// MEMBER SOCIALS

export class IMemberSocials extends BaseEntity {
  facebookUrl: string;

  instagramUrl: string;

  linkedInUrl: string;

  twitterUrl: string;

  member: IMember;
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
}

// ## MEMBER VALUE

export class IMemberValue extends BaseEntity {
  value: string;

  member: IMember;

  question: IQuestion;
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

  member: IMember;

  memberType: IMemberType;
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

  memberValues?: IMemberValue[];
}

// RANKED QUESTION

export class IRankedQuestion extends BaseEntity {
  rank: number;

  application?: IApplication;

  question: IQuestion;
}

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

// ## USER

export class IUser extends BaseEntity {
  email: string;

  members: IMember[];

  supporters: ISupporter[];
}
