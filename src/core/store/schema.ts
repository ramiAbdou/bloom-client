/**
 * @fileoverview Store: Schema
 * - Defines the normalizr schema needed to normalize all of the data based
 * on the relationships of the data. Structures in a way that is very similar
 * to the actual PostgreSQL DB.
 */

import { schema } from 'normalizr';

// ## NORMALIZR SCHEMA DECLARATIONS

const Community = new schema.Entity('communities', {});
const Integrations = new schema.Entity('integrations', {});
const Membership = new schema.Entity('memberships', {});
const Question = new schema.Entity('questions', {});
const User = new schema.Entity('users', {});

// Handle the relationships. Using definition like this handles all of the
// ciruclar dependencies in our code.

Community.define({
  integrations: Integrations,
  memberships: [Membership],
  questions: [Question]
});

Membership.define({ community: Community, user: User });
User.define({ memberships: [Membership] });

// We define an object that carries all the schemas to have everything
// centralized and to reduce confusion with the Interface declarations
// (ie: ICommunity, IUser, etc).
export const Schema = {
  COMMUNITY: Community,
  INTEGRATIONS: Integrations,
  MEMBERSHIP: Membership,
  MEMBERSHIP_QUESTION: Question,
  USER: User
};
