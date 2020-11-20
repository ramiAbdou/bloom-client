/**
 * @fileoverview Store: Schema
 * @author Rami Abdou
 */

/* eslint-disable @typescript-eslint/no-use-before-define */

import { QuestionCategory, QuestionType } from '@constants';

type EntityID = string;

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
  applicationQuestions: EntityID[];
  applicationTitle?: string;
  autoAccept?: boolean;
  encodedUrlName: string;
  id: string;
  integrations: EntityID;
  logoUrl: string;
  members: EntityID[];
  name: string;
  pendingApplicants: EntityID[];
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
  community: EntityID;
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

export interface EntityRecord<
  T =
    | IApplicationQuestion
    | ICommunity
    | IIntegrations
    | IMember
    | IMembership
    | IPendingApplicant
    | IUser
> {
  activeId?: string;
  allIds: string[];
  byId: Record<string, T>;
}
