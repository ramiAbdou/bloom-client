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
  name: string;
  primaryColor: string;
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

export const PendingApplicant = new schema.Entity('pendingApplicants', {});

export const Community = new schema.Entity('communities', {
  applicationQuestions: [ApplicationQuestion],
  // @ts-ignore b/c no matter what, one definition must come before the other.
  memberships: [Membership],
  pendingApplicants: [PendingApplicant]
});

export const Membership = new schema.Entity('memberships', {
  community: Community
});

export const User = new schema.Entity('users', {
  memberships: [Membership]
});
