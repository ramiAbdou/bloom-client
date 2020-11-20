/**
 * @fileoverview Store: Schema
 * - Defines the normalizr schema needed to normalize all of the data based
 * on the relationships of the data. Structures in a way that is very similar
 * to the actual PostgreSQL DB.
 * @author Rami Abdou
 */

/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { schema } from 'normalizr';

// ## NORMALIZR SCHEMA DECLARATIONS

const ApplicationQuestion = new schema.Entity('applicationQuestions', {});

const Integrations = new schema.Entity('integrations', {});

const PendingApplicant = new schema.Entity('pendingApplicants', {});

const Community = new schema.Entity('communities', {
  applicationQuestions: [ApplicationQuestion],
  integrations: Integrations,
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
  APPLICATION_QUESTION: ApplicationQuestion,
  COMMUNITY: Community,
  INTEGRATIONS: Integrations,
  MEMBERSHIP: Membership,
  PENDING_APPLICANT: PendingApplicant,
  USER: User
};
