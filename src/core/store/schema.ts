/**
 * @fileoverview Store: Schema
 * - Defines the normalizr schema needed to normalize all of the data based
 * on the relationships of the data. Structures in a way that is very similar
 * to the actual PostgreSQL DB.
 */

import { schema } from 'normalizr';

// ## NORMALIZR SCHEMA DECLARATIONS

const Admin = new schema.Entity('admins', {});

const MembershipQuestion = new schema.Entity('membershipQuestions', {});

const Integrations = new schema.Entity('integrations', {});

const Members = new schema.Entity('members', {});

const PendingApplicant = new schema.Entity('pendingApplicants', {});

const Community = new schema.Entity('communities', {
  admins: [Admin],
  integrations: Integrations,
  members: [Members],
  membershipQuestions: [MembershipQuestion],
  pendingApplicants: [PendingApplicant]
});

const Membership = new schema.Entity('memberships', {
  community: Community
});

const User = new schema.Entity('users', { memberships: [Membership] });

// We define an object that carries all the schemas to have everything
// centralized and to reduce confusion with the Interface declarations
// (ie: ICommunity, IUser, etc).
export const Schema = {
  ADMIN: Admin,
  COMMUNITY: Community,
  INTEGRATIONS: Integrations,
  MEMBER: Members,
  MEMBERSHIP: Membership,
  MEMBERSHIP_QUESTION: MembershipQuestion,
  PENDING_APPLICANT: PendingApplicant,
  USER: User
};
