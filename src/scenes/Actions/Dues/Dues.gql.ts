import { mutation, query } from 'gql-query-builder';

export const CREATE_PAYMENT_INTENT = mutation({
  operation: 'createPaymentIntent',
  variables: { memberTypeId: { required: true } }
}).query;

export const CONFIRM_PAYMENT_INTENT = mutation({
  operation: 'confirmPaymentIntent',
  variables: { paymentIntentId: { required: true } }
}).query;

export const GET_MEMBER_TYPES = query({
  fields: ['id', 'amount', 'isFree', 'name', 'recurrence'],
  operation: 'getMemberTypes'
}).query;

export const GET_STRIPE_ACCOUNT_ID = query({
  operation: 'getStripeAccountId'
}).query;
