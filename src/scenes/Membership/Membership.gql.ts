import { mutation, query } from 'gql-query-builder';

// ## GET MEMBER PAYMENTS

export const GET_MEMBER_PAYMENTS = query({
  fields: [
    'amount',
    'createdAt',
    'id',
    'stripeInvoiceUrl',
    { member: ['id'] },
    { type: ['id'] }
  ],
  operation: 'getMemberPayments',
  variables: { memberId: { required: false } }
}).query;

// ## GET UPCOMING PAYMENT

export interface GetUpcomingPaymentResult {
  amount: number;
  nextPaymentDate: string;
}

export const GET_UPCOMING_PAYMENT = query({
  fields: ['amount', 'nextPaymentDate'],
  operation: 'getUpcomingPayment'
}).query;

// ## UPDATE MEMBER AUTO_RENEW

export interface UpdateMemberArgs {
  autoRenew?: boolean;
  bio?: boolean;
}

export const UPDATE_MEMBER_AUTO_RENEW = mutation({
  fields: ['id', 'autoRenew'],
  operation: 'updateMember',
  variables: {
    autoRenew: { required: false, type: 'Boolean' },
    bio: { required: false }
  }
}).query;
