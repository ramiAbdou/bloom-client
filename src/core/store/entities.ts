import { QuestionCategory, QuestionType } from '@constants';

export type ICommunity = {
  applicationDescription?: string;
  applicationTitle?: string;
  autoAccept?: boolean;
  encodedUrlName: string;
  id: string;
  integrations: string;
  logoUrl: string;
  members: string[];
  questions: string[];
  name: string;
  primaryColor: string;
};

export type IIntegrations = {
  isMailchimpAuthenticated: boolean;
  isZoomAuthenticated: boolean;
  mailchimpLists: { name: string; id: string }[];
  mailchimpListId: string;
  mailchimpListName: string;
  stripeAccountId: string;
  zoomAccountInfo: { email: string; pmi: number; userId: string };
};

export type IMember = {
  allData?: { questionId: string; value: string }[];
  applicantData: { question?: IQuestion; questionId?: string; value: string }[];
  bio: string;
  cardData?: { questionId: string; value: string }[];
  community: string;
  createdAt: string;
  id: string;
  role?: 'ADMIN' | 'OWNER';
  type: { name: string };
  status: 'REJECTED' | 'PENDING' | 'INVITED' | 'ACCEPTED';
  user: string;
};

export type IQuestion = {
  category: QuestionCategory;
  id: string;
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
  email: string;
  facebookUrl: string;
  firstName: string;
  id: string;
  instagramUrl: string;
  lastName: string;
  linkedInUrl: string;
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
  users: EntityRecord<IUser>;
};

// Initial state for all of the entity (DB) definitions.
export const initialEntities: IEntities = {
  communities: { activeId: null, allIds: [], byId: {} },
  integrations: { allIds: [], byId: {} },
  members: { activeId: null, allIds: [], byId: {} },
  questions: { allIds: [], byId: {} },
  users: { allIds: [], byId: {} }
};
