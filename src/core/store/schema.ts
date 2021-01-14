/**
 * @fileoverview Store: Schema
 * - Defines the normalizr schema needed to normalize all of the data based
 * on the relationships of the data. Structures in a way that is very similar
 * to the actual PostgreSQL DB.
 */

import { schema } from 'normalizr';

import { takeFirst } from '@util/util';

// ## NORMALIZR SCHEMA DECLARATIONS

const Community = new schema.Entity('communities', {});
const Integrations = new schema.Entity('integrations', {});

const Member = new schema.Entity(
  'members',
  {},
  {
    mergeStrategy: (a, b) => {
      const aPayments = a.payments;
      const bPayments = b.payments;

      const hasPayments: boolean = aPayments?.length && bPayments?.length;

      const updatedB = hasPayments
        ? {
            ...b,
            payments: aPayments
              .filter((value: any) => !bPayments.includes(value))
              .concat(bPayments)
          }
        : b;

      return { ...a, ...updatedB };
    },

    processStrategy: (value, parent) => {
      const processedData = takeFirst([
        [!!parent.stripeInvoiceUrl, { payments: [parent.id] }],
        {}
      ]);

      return { ...value, ...processedData };
    }
  }
);

const MemberData = new schema.Entity('data', {});
const MemberPayment = new schema.Entity('payments', {});
const MemberType = new schema.Entity('types', {});
const Question = new schema.Entity('questions', {});
const User = new schema.Entity('users', {});

// Handle the relationships. Using definition like this handles all of the
// ciruclar dependencies in our code.

Community.define({
  integrations: Integrations,
  members: [Member],
  questions: [Question],
  types: [MemberType]
});

Member.define({
  community: Community,
  data: [MemberData],
  payments: [MemberPayment],
  type: MemberType,
  user: User
});

MemberData.define({ question: Question });
MemberPayment.define({ member: Member, type: MemberType });
User.define({ members: [Member] });

// We define an object that carries all the schemas to have everything
// centralized and to reduce confusion with the Interface declarations
// (ie: ICommunity, IUser, etc).
export const Schema = {
  COMMUNITY: Community,
  INTEGRATIONS: Integrations,
  MEMBER: Member,
  MEMBER_DATA: MemberData,
  MEMBER_PAYMENT: MemberPayment,
  MEMBER_TYPE: MemberType,
  USER: User
};
