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
  description: string;
  questions: Identifier[];
  title: string;
}

// APPLICATION QUESTION

export interface IApplicationQuestion extends BaseEntity {
  application: Identifier;
  rank: number;
  question: Identifier;
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
  plans: Identifier[];
  primaryColor: string;
  supporters: Identifier[];
  urlName: string;
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
  plan: Identifier;
  role?: MemberRole;
  socials: Identifier;
  status: MemberStatus;
  stripeSubscriptionId?: string;
  user: Identifier;
  values: Identifier[];
  watches: Identifier[];
}

// ## MEMBER PLAN

export enum RecurrenceType {
  LIFETIME = 'Lifetime',
  MONTHLY = 'Monthly',
  YEARLY = 'Yearly'
}

export interface IMemberPlan extends BaseEntity {
  amount: number;
  isFree: boolean;
  name: string;
  recurrence: RecurrenceType;
}

// MEMBER SOCIALS

export interface IMemberSocials extends BaseEntity {
  clubhouseUrl: string;
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

// ## PAYMENT

export interface IPayment extends BaseEntity {
  amount: number;
  stripeInvoiceUrl: string;
  member: Identifier;
  plan: Identifier;
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
  applicationQuestions: EntityRecord<IApplicationQuestion>;
  attendees: EntityRecord<IEventAttendee>;
  communities: EntityRecord<ICommunity>;
  events: EntityRecord<IEvent>;
  guests: EntityRecord<IEventGuest>;
  integrations: EntityRecord<IIntegrations>;
  members: EntityRecord<IMember>;
  memberPlans: EntityRecord<IMemberPlan>;
  payments: EntityRecord<IPayment>;
  questions: EntityRecord<IQuestion>;
  socials: EntityRecord<IMemberSocials>;
  supporters: EntityRecord<ISupporter>;
  users: EntityRecord<IUser>;
  values: EntityRecord<IMemberValue>;
  watches: EntityRecord<IEventWatch>;
}

// Initial state for all of the entity (DB) definitions.
export const initialEntities: IEntities = {
  applicationQuestions: { byId: {} },
  applications: { byId: {} },
  attendees: { byId: {} },
  communities: { activeId: null, byId: {} },
  events: { activeId: null, byId: {} },
  guests: { byId: {} },
  integrations: { byId: {} },
  memberPlans: { byId: {} },
  members: { activeId: null, byId: {} },
  payments: { byId: {} },
  questions: { byId: {} },
  socials: { byId: {} },
  supporters: { byId: {} },
  users: { activeId: null, byId: {} },
  values: { byId: {} },
  watches: { byId: {} }
};
