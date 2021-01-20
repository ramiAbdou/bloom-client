import { QuestionCategory, QuestionType } from '@constants';

type IdString = string;

export interface ICommunity {
  application?: IdString;
  autoAccept?: boolean;
  events?: IdString[];
  id: IdString;
  integrations: IdString;
  logoUrl: string;
  members: IdString[];
  payments: IdString[];
  questions: IdString[];
  name: string;
  primaryColor: string;
  types: IdString[];
  urlName: string;
}

export interface ICommunityApplication {
  description: string;
  title: string;
}

export interface IEvent {
  description: string;
  endTime: string;
  id: IdString;
  imageUrl?: string;
  private: boolean;
  startTime: string;
  title: string;
  videoUrl: string;
}

export interface IIntegrations {
  isMailchimpAuthenticated: boolean;
  mailchimpLists: { name: string; id: string }[];
  mailchimpListId: string;
  mailchimpListName: string;
  stripeAccountId: string;
}

export interface IPaymentMethod {
  brand: string;
  expirationDate: string;
  last4: string;
  zipCode: string;
}

export interface IMember {
  autoRenew: boolean;
  applicantData: { question?: IQuestion; questionId?: string; value: string }[];
  bio: string;
  community: IdString;
  createdAt: string;
  data: IdString[];
  duesStatus: 'Active' | 'Inactive';
  id: IdString;
  joinedAt: string;
  paymentMethod: IPaymentMethod;
  payments: IdString[];
  role?: 'ADMIN' | 'OWNER';
  type: IdString;
  status: 'REJECTED' | 'PENDING' | 'INVITED' | 'ACCEPTED';
  user: IdString;
}

export interface IMemberData {
  id: IdString;
  question: IdString;
  value: string | string[];
}

export interface IMemberPayment {
  amount: number;
  createdAt: string;
  stripeInvoiceUrl: string;
  id: IdString;
  member: IdString;
  type: IdString;
}

export interface IMemberType {
  amount: number;
  id: IdString;
  isFree: boolean;
  name: string;
  recurrence: 'LIFETIME' | 'MONTHLY' | 'YEARLY';
}

export interface IQuestion {
  category: QuestionCategory;
  id: IdString;
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

export interface IUser {
  currentLocation: string;
  email: string;
  facebookUrl: string;
  firstName: string;
  gender?: 'Male' | 'Female' | 'Non-Binary' | 'Prefer Not to Say';
  id: IdString;
  instagramUrl: string;
  lastName: string;
  linkedInUrl: string;
  members?: IdString[];
  pictureUrl: string;
  twitterUrl: string;
}

export interface EntityRecord<T> {
  activeId?: string;
  allIds: string[];
  byId: Record<string, T>;
}

export interface IEntities {
  applications: EntityRecord<ICommunityApplication>;
  communities: EntityRecord<ICommunity>;
  data: EntityRecord<IMemberData>;
  events: EntityRecord<IEvent>;
  integrations: EntityRecord<IIntegrations>;
  members: EntityRecord<IMember>;
  payments: EntityRecord<IMemberPayment>;
  questions: EntityRecord<IQuestion>;
  types: EntityRecord<IMemberType>;
  users: EntityRecord<IUser>;
}

// Initial state for all of the entity (DB) definitions.
export const initialEntities: IEntities = {
  applications: { allIds: [], byId: {} },
  communities: { activeId: null, allIds: [], byId: {} },
  data: { allIds: [], byId: {} },
  events: { allIds: [], byId: {} },
  integrations: { allIds: [], byId: {} },
  members: { activeId: null, allIds: [], byId: {} },
  payments: { allIds: [], byId: {} },
  questions: { allIds: [], byId: {} },
  types: { allIds: [], byId: {} },
  users: { allIds: [], byId: {} }
};
