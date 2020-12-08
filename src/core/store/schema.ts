/**
 * @fileoverview Store: Schema
 * - Defines the normalizr schema needed to normalize all of the data based
 * on the relationships of the data. Structures in a way that is very similar
 * to the actual PostgreSQL DB.
 */

import { schema } from 'normalizr';

// ## NORMALIZR SCHEMA DECLARATIONS

const Question = new schema.Entity('questions', {});

const Integrations = new schema.Entity('integrations', {});

const PendingApplicant = new schema.Entity('pendingApplicants', {});

const Community = new schema.Entity('communities', {
  integrations: Integrations,
  pendingApplicants: [PendingApplicant],
  questions: [Question]
});

const Membership = new schema.Entity('memberships', {
  community: Community
});

const User = new schema.Entity('users', { memberships: [Membership] });

// Handle the circular dependencies in relationships.

Community.define({ memberships: [Membership] });
Membership.define({ user: User });

// We define an object that carries all the schemas to have everything
// centralized and to reduce confusion with the Interface declarations
// (ie: ICommunity, IUser, etc).
export const Schema = {
  COMMUNITY: Community,
  INTEGRATIONS: Integrations,
  MEMBERSHIP: Membership,
  MEMBERSHIP_QUESTION: Question,
  PENDING_APPLICANT: PendingApplicant,
  USER: User
};
