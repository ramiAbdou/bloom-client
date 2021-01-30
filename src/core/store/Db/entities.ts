import { QuestionCategory, QuestionType, TimeSeriesData } from '@constants';

type IdString = string;

export interface BaseEntity {
  createdAt: IdString;
  id: IdString;
  updatedAt: IdString;
}

// ## COMMUNITY

export interface ICommunity extends BaseEntity {
  application?: IdString;
  autoAccept?: boolean;
  canCollectDues?: boolean;
  events?: IdString[];
  integrations: IdString;
  logoUrl: string;
  members: IdString[];
  payments: IdString[];
  questions: IdString[];
  name: string;
  owner?: IdString;
  primaryColor: string;
  types: IdString[];
  urlName: string;
}

// ## COMMUNITY APPLICATION

export interface ICommunityApplication extends BaseEntity {
  community?: IdString;
  description: string;
  title: string;
}

// ## EVENT

export interface IEvent extends BaseEntity {
  attendees: IdString[];
  attendeesSeries: TimeSeriesData[];
  community?: IdString;
  description: string;
  endTime: string;
  eventUrl: string;
  guests: IdString[];
  guestsSeries: TimeSeriesData[];
  imageUrl?: string;
  past?: boolean;
  private: boolean;
  recordingUrl?: string;
  startTime: string;
  summary: string;
  title: string;
  upcoming?: boolean;
  videoUrl: string;
  watches: IdString[];
}

// ## EVENT ATTENDEE

export interface IEventAttendee extends BaseEntity {
  email?: string;
  event: IdString;
  firstName?: string;
  lastName?: string;
  member: IdString;
}

// ## EVENT GUEST

export interface IEventGuest extends BaseEntity {
  email?: string;
  event: IdString;
  firstName?: string;
  lastName?: string;
  member: IdString;
}

// ## EVENT WATCH

export interface IEventWatch extends BaseEntity {
  event: IdString;
  member: IdString;
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

export interface IMember extends BaseEntity {
  attendees: IdString[];
  autoRenew: boolean;
  applicantData: { question?: IQuestion; questionId?: string; value: string }[];
  bio: string;
  community: IdString;
  data: IdString[];
  duesStatus: 'Active' | 'Inactive';
  guests: IdString[];
  joinedAt: string;
  paymentMethod: IPaymentMethod;
  payments: IdString[];
  role?: 'ADMIN' | 'OWNER';
  type: IdString;
  status: 'REJECTED' | 'PENDING' | 'INVITED' | 'ACCEPTED';
  user: IdString;
  watches: IdString[];
}

// ## MEMBER DATA

export interface IMemberData extends BaseEntity {
  question: IdString;
  value: string | string[];
}

// ## MEMBER PAYMENT

export interface IMemberPayment extends BaseEntity {
  amount: number;
  stripeInvoiceUrl: string;
  member: IdString;
  type: IdString;
}

// ## MEMBER TYPE

export interface IMemberType extends BaseEntity {
  amount: number;
  isFree: boolean;
  name: string;
  recurrence: 'LIFETIME' | 'MONTHLY' | 'YEARLY';
}

// ## QUESTION

export interface IQuestion extends BaseEntity {
  category: QuestionCategory;
  inApplication: boolean;
  inApplicantCard: boolean;
  inDirectoryCard: boolean;
  inExpandedDirectoryCard: boolean;
  onlyInApplication: boolean;
  order: number;
  options: string[];
  required: boolean;
  title: QuestionType;
  type: QuestionType;
  version: number;
}

// ## USER

export interface IUser extends BaseEntity {
  currentLocation: string;
  email: string;
  facebookUrl: string;
  firstName: string;
  fullName?: string;
  gender?: 'Male' | 'Female' | 'Non-Binary' | 'Prefer Not to Say';
  instagramUrl: string;
  lastName: string;
  linkedInUrl: string;
  members?: IdString[];
  pictureUrl: string;
  twitterUrl: string;
}

export interface EntityRecord<T> {
  activeId?: string;
  byId: Record<string, T>;
}

export interface IEntities {
  applications: EntityRecord<ICommunityApplication>;
  attendees: EntityRecord<IEventAttendee>;
  communities: EntityRecord<ICommunity>;
  data: EntityRecord<IMemberData>;
  events: EntityRecord<IEvent>;
  guests: EntityRecord<IEventGuest>;
  integrations: EntityRecord<IIntegrations>;
  members: EntityRecord<IMember>;
  payments: EntityRecord<IMemberPayment>;
  questions: EntityRecord<IQuestion>;
  types: EntityRecord<IMemberType>;
  users: EntityRecord<IUser>;
  watches: EntityRecord<IEventWatch>;
}

// Initial state for all of the entity (DB) definitions.
export const initialEntities: IEntities = {
  applications: { byId: {} },
  attendees: { byId: {} },
  communities: { activeId: null, byId: {} },
  data: { byId: {} },
  events: { activeId: null, byId: {} },
  guests: { byId: {} },
  integrations: { byId: {} },
  members: { activeId: null, byId: {} },
  payments: { byId: {} },
  questions: { byId: {} },
  types: { byId: {} },
  users: { activeId: null, byId: {} },
  watches: { byId: {} }
};
