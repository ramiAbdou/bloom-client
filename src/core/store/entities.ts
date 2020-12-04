import { QuestionCategory, QuestionType } from '@constants';

export type IAdmin = {
  email: string;
  firstName: string;
  id: string; // This is simply the membership ID, not the user ID.
  lastName: string;
};

export type IMembershipQuestion = {
  category: QuestionCategory;
  id: string;
  inApplicantCard: boolean;
  order: number;
  options: string[];
  required: boolean;
  title: QuestionType;
  type: QuestionType;
  version: number;
};

export type ICommunity = {
  admins: string[];
  applicationDescription?: string;
  applicationTitle?: string;
  autoAccept?: boolean;
  encodedUrlName: string;
  id: string;
  integrations: string;
  logoUrl: string;
  members: string[];
  membershipQuestions: string[];
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
  allData: { questionId: string; value: string }[];
  id: string;
  role?: 'ADMIN' | 'OWNER';
};

export type IMembership = {
  community: string;
  id: string;
  role: 'ADMIN' | 'OWNER';
  type: { name: string };
};

export type ApplicantData = {
  question?: IMembershipQuestion;
  questionId?: string;
  value: string;
};

export type IPendingApplicant = {
  applicantData: ApplicantData[];
  createdAt: string;
  id: string;
};

export type IUser = {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  pictureURL: string;
};

export interface EntityRecord<T> {
  activeId?: string;
  allIds: string[];
  byId: Record<string, T>;
}

export type IEntities = {
  admins: EntityRecord<IAdmin>;
  communities: EntityRecord<ICommunity>;
  integrations: EntityRecord<IIntegrations>;
  members: EntityRecord<IMember>;
  membershipQuestions: EntityRecord<IMembershipQuestion>;
  memberships: EntityRecord<IMembership>;
  pendingApplicants: EntityRecord<IPendingApplicant>;
  users: EntityRecord<IUser>;
};

// Initial state for all of the entity (DB) definitions.
export const initialEntities: IEntities = {
  admins: { allIds: [], byId: {} },
  communities: { activeId: null, allIds: [], byId: {} },
  integrations: { allIds: [], byId: {} },
  members: { allIds: [], byId: {} },
  membershipQuestions: { allIds: [], byId: {} },
  memberships: { activeId: null, allIds: [], byId: {} },
  pendingApplicants: { allIds: [], byId: {} },
  users: { allIds: [], byId: {} }
};
