import { mutation, query } from 'gql-query-builder';

export const GET_MEMBER_TYPES = query({
  fields: ['id', 'amount', 'isFree', 'name', 'recurrence'],
  operation: 'getMemberTypes'
}).query;

export const GET_PAYMENT_CLIENT_SECRET = mutation({
  operation: 'getPaymentClientSecret',
  variables: { memberTypeId: { required: true } }
}).query;

export const GET_STRIPE_ACCOUNT_ID = query({
  operation: 'getStripeAccountId'
}).query;
