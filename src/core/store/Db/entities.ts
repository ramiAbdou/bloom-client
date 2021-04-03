import {
  QuestionCategory,
  QuestionType,
  TimeSeriesData
} from '@util/constants';

export type Identifier = string;

export interface BaseEntity {
  createdAt: Identifier;
  deletedAt?: Identifier;
  id: Identifier;
  updatedAt: Identifier;
}

// ## APPLICATION

export interface IApplication extends BaseEntity {
  community: Identifier;
  communityId: Identifier;
  description: string;
  questions: Identifier[];
  title: string;
}

// ## COMMUNITY

export interface ICommunity extends BaseEntity {
  application?: Identifier;
  autoAccept?: boolean;
  canCollectDues?: boolean;
  communityIntegrations: Identifier;
  events?: Identifier[];
  highlightedQuestion: Identifier;
  logoUrl: string;
  memberTypes: Identifier[];
  members: Identifier[];
  payments: Identifier[];
  questions: Identifier[];
  name: string;
  owner?: Identifier;
  primaryColor: string;
  supporters: Identifier[];
  urlName: string;
}

// ## COMMUNITY INTEGRATIONS

export interface ICommunityIntegrations extends BaseEntity {
  community: Identifier;
  isMailchimpAuthenticated: boolean;
  mailchimpLists: { name: string; id: string }[];
  mailchimpListId: string;
  mailchimpListName: string;
  stripeAccountId: string;
}

// ## EVENT

export enum EventPrivacy {
  MEMBERS_ONLY = 'Members Only',
  OPEN_TO_ALL = 'Open to All'
}

export interface IEvent extends BaseEntity {
  attendeesSeries: TimeSeriesData[];
  community?: Identifier;
  description: string;
  endTime: string;
  eventAttendees: Identifier[];
  eventGuests: Identifier[];
  eventUrl: string;
  eventWatches: Identifier[];
  guestsSeries: TimeSeriesData[];
  imageUrl?: string;
  invitees?: Identifier[];
  past?: boolean;
  privacy: EventPrivacy;
  recordingUrl?: string;
  startTime: string;
  summary: string;
  title: string;
  upcoming?: boolean;
  videoUrl: string;
}

// ## EVENT ATTENDEE

export interface IEventAttendee extends BaseEntity {
  event: Identifier;
  member?: Identifier;
  supporter?: Identifier;
}

// ## EVENT GUEST

export interface IEventGuest extends BaseEntity {
  event: Identifier;
  member?: Identifier;
  supporter?: Identifier;
}

// ## EVENT WATCH

export interface IEventWatch extends BaseEntity {
  event: Identifier;
  member: Identifier;
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

export interface IMember extends BaseEntity {
  bio: string;
  community: Identifier;
  email: string;
  eventAttendees: Identifier[];
  eventGuests: Identifier[];
  eventWatches: Identifier[];
  firstName: string;
  isDuesActive: boolean;
  joinedAt: string;
  lastName: string;
  memberIntegrations: Identifier;
  memberSocials: Identifier;
  memberType: Identifier;
  memberValues: Identifier[];
  payments: Identifier[];
  pictureUrl: string;
  position?: string;
  role?: MemberRole;
  status: MemberStatus;
  user: Identifier;
}

// ## MEMBER COMMUNITY INTEGRATIONS

export interface IPaymentMethod {
  brand: string;
  expirationDate: string;
  last4: string;
  paymentMethodId?: string;
  zipCode: string;
}

export interface IMemberIntegrations extends BaseEntity {
  member: Identifier;
  paymentMethod: IPaymentMethod;
  renewalDate?: string;
  stripeSubscriptionId?: string;
}

// ## MEMBER TYPE

export enum RecurrenceType {
  MONTHLY = 'Monthly',
  YEARLY = 'Yearly'
}

export interface IMemberType extends BaseEntity {
  amount: number;
  isFree: boolean;
  name: string;
  recurrence: RecurrenceType;
}

// MEMBER SOCIALS

export interface IMemberSocials extends BaseEntity {
  facebookUrl: string;
  instagramUrl: string;
  linkedInUrl: string;
  twitterUrl: string;
}

// ## MEMBER VALUE

export interface IMemberValue extends BaseEntity {
  member: Identifier;
  question: Identifier;
  value: string | string[];
}

// ## PAYMENT

export enum PaymentType {
  DONATION = 'DONATION',
  DUES = 'DUES'
}

export interface IPayment extends BaseEntity {
  amount: number;
  stripeInvoiceUrl: string;
  member: Identifier;
  memberType: Identifier;
  type: PaymentType;
}

// ## QUESTION

export interface IQuestion extends BaseEntity {
  category: QuestionCategory;
  locked: boolean;
  memberValues?: Identifier[];
  options: string[];
  rank?: number;
  required: boolean;
  title: QuestionType;
  type: QuestionType;
}

// RANKED QUESTION

export interface IRankedQuestion extends BaseEntity {
  application?: Identifier;
  rank: number;
  question: Identifier;
}

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
