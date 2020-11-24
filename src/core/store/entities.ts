/**
 * @fileoverview Store: Schema
 * @author Rami Abdou
 */

import { QuestionCategory, QuestionType } from '@constants';

export type IApplicationQuestion = {
  category: QuestionCategory;
  id: string;
  inApplicantCard: boolean;
  order: number;
  options: string[];
  required: boolean;
  title: QuestionType;
  type: QuestionType;
};

export type ICommunity = {
  applicationDescription?: string;
  membershipQuestions: string[];
  applicationTitle?: string;
  autoAccept?: boolean;
  encodedUrlName: string;
  id: string;
  integrations: string;
  logoUrl: string;
  members: string[];
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
};

export type IMembership = {
  community: string;
  id: string;
  role: 'ADMIN' | 'OWNER';
  type: IMembershipType;
};

type IMembershipType = { name: string };

export type UnresolvedApplicantData = { questionId: string; value: string };
export type ResolvedApplicantData = {
  question: IApplicationQuestion;
  value: string;
};

export type IPendingApplicant = {
  applicantData: UnresolvedApplicantData[] | ResolvedApplicantData[];
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
  membershipQuestions: EntityRecord<IApplicationQuestion>;
  communities: EntityRecord<ICommunity>;
  integrations: EntityRecord<IIntegrations>;
  members: EntityRecord<IMember>;
  memberships: EntityRecord<IMembership>;
  pendingApplicants: EntityRecord<IPendingApplicant>;
  users: EntityRecord<IUser>;
};

// Initial state for all of the entity (DB) definitions.
export const initialEntities: IEntities = {
  communities: { activeId: null, allIds: [], byId: {} },
  integrations: { allIds: [], byId: {} },
  members: { allIds: [], byId: {} },
  membershipQuestions: { allIds: [], byId: {} },
  memberships: { activeId: null, allIds: [], byId: {} },
  pendingApplicants: { allIds: [], byId: {} },
  users: { allIds: [], byId: {} }
};
