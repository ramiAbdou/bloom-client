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

// ## COMMUNITY

export interface ICommunity extends BaseEntity {
  application?: Identifier;
  autoAccept?: boolean;
  canCollectDues?: boolean;
  events?: Identifier[];
  highlightedQuestion: Identifier;
  integrations: Identifier;
  logoUrl: string;
  members: Identifier[];
  payments: Identifier[];
  questions: Identifier[];
  name: string;
  owner?: Identifier;
  primaryColor: string;
  types: Identifier[];
  urlName: string;
}

// ## COMMUNITY APPLICATION

export interface ICommunityApplication extends BaseEntity {
  community?: Identifier;
  description: string;
  title: string;
}

// ## EVENT

export enum EventPrivacy {
  MEMBERS_ONLY = 'Members Only',
  OPEN_TO_ALL = 'Open to All'
}

export interface IEvent extends BaseEntity {
  attendees: Identifier[];
  attendeesSeries: TimeSeriesData[];
  community?: Identifier;
  description: string;
  endTime: string;
  eventUrl: string;
  guests: Identifier[];
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
  watches: Identifier[];
}

// ## EVENT ATTENDEE

export interface IEventAttendee extends BaseEntity {
  email?: string;
  event: Identifier;
  firstName?: string;
  lastName?: string;
  member: Identifier;
}

// ## EVENT GUEST

export interface IEventGuest extends BaseEntity {
  email?: string;
  event: Identifier;
  firstName?: string;
  lastName?: string;
  member: Identifier;
}

// ## EVENT WATCH

export interface IEventWatch extends BaseEntity {
  event: Identifier;
  member: Identifier;
}

// ## INTEGRATIONS

export interface IIntegrations extends BaseEntity {
  isMailchimpAuthenticated: boolean;
  mailchimpLists: { name: string; id: string }[];
  mailchimpListId: string;
  mailchimpListName: string;
  stripeAccountId: string;
}

// ## MEMBER

export interface IPaymentMethod {
  brand: string;
  expirationDate: string;
  last4: string;
  zipCode: string;
}

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
  attendees: Identifier[];
  bio: string;
  community: Identifier;
  email: string;
  firstName: string;
  guests: Identifier[];
  isDuesActive: boolean;
  joinedAt: string;
  lastName: string;
  paymentMethod: IPaymentMethod;
  payments: Identifier[];
  pictureUrl: string;
  role?: MemberRole;
  type: Identifier;
  socials: Identifier;
  status: MemberStatus;
  stripeSubscriptionId?: string;
  user: Identifier;
  values: Identifier[];
  watches: Identifier[];
}

// ## MEMBER VALUE

export interface IMemberValue extends BaseEntity {
  member: Identifier;
  question: Identifier;
  value: string | string[];
}

// ## MEMBER PAYMENT

export interface IMemberPayment extends BaseEntity {
  amount: number;
  stripeInvoiceUrl: string;
  member: Identifier;
  type: Identifier;
}

export interface IMemberSocials extends BaseEntity {
  clubhouseUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedInUrl: string;
  twitterUrl: string;
}

// ## MEMBER TYPE

export enum RecurrenceType {
  LIFETIME = 'Lifetime',
  MONTHLY = 'Monthly',
  YEARLY = 'Yearly'
}

export interface IMemberType extends BaseEntity {
  amount: number;
  isFree: boolean;
  name: string;
  recurrence: RecurrenceType;
}

// ## QUESTION

export interface IQuestion extends BaseEntity {
  category: QuestionCategory;
  locked: boolean;
  options: string[];
  required: boolean;
  title: QuestionType;
  type: QuestionType;
  values?: Identifier[];
}

// ## USER

export interface IUser extends BaseEntity {
  email: string;
  members?: Identifier[];
}

export interface EntityRecord<T> {
  activeId?: string;
  byId: Record<string, T>;
}

export interface IEntities {
  applications: EntityRecord<ICommunityApplication>;
  attendees: EntityRecord<IEventAttendee>;
  communities: EntityRecord<ICommunity>;
  events: EntityRecord<IEvent>;
  guests: EntityRecord<IEventGuest>;
  integrations: EntityRecord<IIntegrations>;
  members: EntityRecord<IMember>;
  payments: EntityRecord<IMemberPayment>;
  questions: EntityRecord<IQuestion>;
  socials: EntityRecord<IMemberSocials>;
  types: EntityRecord<IMemberType>;
  users: EntityRecord<IUser>;
  values: EntityRecord<IMemberValue>;
  watches: EntityRecord<IEventWatch>;
}

// Initial state for all of the entity (DB) definitions.
export const initialEntities: IEntities = {
  applications: { byId: {} },
  attendees: { byId: {} },
  communities: { activeId: null, byId: {} },
  events: { activeId: null, byId: {} },
  guests: { byId: {} },
  integrations: { byId: {} },
  members: { activeId: null, byId: {} },
  payments: { byId: {} },
  questions: { byId: {} },
  socials: { byId: {} },
  types: { byId: {} },
  users: { activeId: null, byId: {} },
  values: { byId: {} },
  watches: { byId: {} }
};
