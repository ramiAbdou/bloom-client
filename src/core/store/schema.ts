/**
 * @fileoverview Store: Schema
 * @author Rami Abdou
 */

/* eslint-disable @typescript-eslint/no-use-before-define */

import { schema } from 'normalizr';

import { QuestionType } from '@constants';

type EntityID = string;

export type Entity =
  | 'applicationQuestions'
  | 'applications'
  | 'communities'
  | 'members'
  | 'memberships'
  | 'pendingApplicants'
  | 'users';

export type IApplicationQuestion = {
  id: string;
  order: number;
  title: QuestionType;
  type: QuestionType;
};

export type ICommunity = {
  applicationQuestions: EntityID[];
  encodedUrlName: string;
  id: string;
  logoUrl: string;
  members: EntityID[];
  name: string;
  pendingApplicants: EntityID[];
  primaryColor: string;
};

export type IMember = {
  allData: { questionId: string; value: string }[];
  id: string;
};

export type IMembership = {
  community: EntityID;
  id: string;
  role: 'ADMIN' | 'OWNER';
};

export type IPendingApplicant = {
  applicantData: { questionId: string; value: string }[];
  id: string;
};

export type IUser = {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
};

export interface EntityRecord<
  T =
    | IApplicationQuestion
    | ICommunity
    | IMember
    | IMembership
    | IPendingApplicant
    | IUser
> {
  activeId?: string;
  allIds: string[];
  byId: Record<string, T>;
}

export const ApplicationQuestion = new schema.Entity(
  'applicationQuestions',
  {}
);

export const Member = new schema.Entity('members', {});

export const PendingApplicant = new schema.Entity('pendingApplicants', {});

export const Community = new schema.Entity('communities', {
  applicationQuestions: [ApplicationQuestion],
  members: [Member],
  pendingApplicants: [PendingApplicant]
});

export const Membership = new schema.Entity('memberships', {
  community: Community
});

export const User = new schema.Entity('users', {
  memberships: [Membership]
});
