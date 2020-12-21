import { mutation, query } from 'gql-query-builder';

export interface CreateSubscriptionArgs {
  memberTypeId: string;
  paymentMethodId: string;
}

export interface CreateSubscriptionResult {
  id: string;
  duesStatus: string;
  type: { id: string; name: string };
}

export const CREATE_SUBSCRIPTION = mutation({
  fields: ['id', 'duesStatus', { type: ['id', 'name'] }],
  operation: 'createSubscription',
  variables: {
    memberTypeId: { required: true },
    paymentMethodId: { required: true }
  }
}).query;

export const GET_DUES_INFORMATION = query({
  fields: [
    'id',
    { integrations: ['stripeAccountId'] },
    { types: ['id', 'amount', 'isFree', 'name', 'recurrence'] }
  ],
  operation: 'getDuesInformation'
}).query;
