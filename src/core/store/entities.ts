import { QuestionCategory, QuestionType } from '@constants';

export type ICommunity = {
  applicationDescription?: string;
  applicationTitle?: string;
  autoAccept?: boolean;
  encodedUrlName: string;
  id: string;
  integrations: string;
  logoUrl: string;
  memberships: string[];
  questions: string[];
  name: string;
  pendingApplicants: string[];
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
  bio: string;
  cardData?: { questionId: string; value: string }[];
  id: string;
  role?: 'ADMIN' | 'OWNER';
  user: string;
};

export type IMembership = {
  allData?: { questionId: string; value: string }[];
  bio: string;
  cardData?: { questionId: string; value: string }[];
  community: string;
  id: string;
  role: 'ADMIN' | 'OWNER';
  type: { name: string };
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

export type ApplicantData = {
  question?: IQuestion;
  questionId?: string;
  value: string;
};

export type IPendingApplicant = {
  applicantData: ApplicantData[];
  createdAt: string;
  id: string;
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
  memberships: EntityRecord<IMembership>;
  questions: EntityRecord<IQuestion>;
  pendingApplicants: EntityRecord<IPendingApplicant>;
  users: EntityRecord<IUser>;
};

// Initial state for all of the entity (DB) definitions.
export const initialEntities: IEntities = {
  communities: { activeId: null, allIds: [], byId: {} },
  integrations: { allIds: [], byId: {} },
  memberships: { activeId: null, allIds: [], byId: {} },
  pendingApplicants: { allIds: [], byId: {} },
  questions: { allIds: [], byId: {} },
  users: { allIds: [], byId: {} }
};
