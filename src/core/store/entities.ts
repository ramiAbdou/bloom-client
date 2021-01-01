import { QuestionCategory, QuestionType } from '@constants';

type IdString = string;

export type ICommunity = {
  applicationDescription?: string;
  applicationTitle?: string;
  autoAccept?: boolean;
  encodedUrlName: string;
  id: IdString;
  integrations: IdString;
  logoUrl: string;
  members: IdString[];
  questions: IdString[];
  name: string;
  primaryColor: string;
  types: IdString[];
};

export type IIntegrations = {
  isMailchimpAuthenticated: boolean;
  mailchimpLists: { name: string; id: string }[];
  mailchimpListId: string;
  mailchimpListName: string;
  stripeAccountId: string;
};

export type IPaymentMethod = {
  brand: string;
  expirationDate: string;
  last4: string;
  zipCode: string;
};

export type IMember = {
  allData?: { questionId: string; value: string }[];
  applicantData: { question?: IQuestion; questionId?: string; value: string }[];
  bio: string;
  cardData?: { questionId: string; value: string }[];
  community: IdString;
  createdAt: string;
  duesStatus: 'ACTIVE' | 'INACTIVE' | 'LAME';
  id: IdString;
  paymentMethod: IPaymentMethod;
  role?: 'ADMIN' | 'OWNER';
  type: IdString;
  status: 'REJECTED' | 'PENDING' | 'INVITED' | 'ACCEPTED';
  user: IdString;
};

export type IMemberType = {
  amount: number;
  id: IdString;
  isFree: boolean;
  name: boolean;
  recurrence: 'LIFETIME' | 'MONTHLY' | 'YEARLY';
};

export type IQuestion = {
  category: QuestionCategory;
  id: IdString;
  inApplicantCard: boolean;
  inDirectoryCard: boolean;
  order: number;
  options: string[];
  required: boolean;
  title: QuestionType;
  type: QuestionType;
  version: number;
};

export type IUser = {
  currentLocation: string;
  email: string;
  facebookUrl: string;
  firstName: string;
  id: IdString;
  instagramUrl: string;
  lastName: string;
  linkedInUrl: string;
  members?: IdString[];
  pictureUrl: string;
  twitterUrl: string;
};

export interface EntityRecord<T> {
  activeId?: string;
  allIds: string[];
  byId: Record<string, T>;
}

export type IEntities = {
  communities: EntityRecord<ICommunity>;
  integrations: EntityRecord<IIntegrations>;
  members: EntityRecord<IMember>;
  questions: EntityRecord<IQuestion>;
  types: EntityRecord<IMemberType>;
  users: EntityRecord<IUser>;
};

// Initial state for all of the entity (DB) definitions.
export const initialEntities: IEntities = {
  communities: { activeId: null, allIds: [], byId: {} },
  integrations: { allIds: [], byId: {} },
  members: { activeId: null, allIds: [], byId: {} },
  questions: { allIds: [], byId: {} },
  types: { activeId: null, allIds: [], byId: {} },
  users: { allIds: [], byId: {} }
};
