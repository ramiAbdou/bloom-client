import { mutation, query } from 'gql-query-builder';

import { IMemberType } from '@store/entities';

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

export interface GetDuesInformationResult {
  stripeAccountId: string;
  types: IMemberType[];
}

export const GET_DUES_INFORMATION = query({
  fields: [
    'stripeAccountId',
    { types: ['id', 'amount', 'isFree', 'name', 'recurrence'] }
  ],
  operation: 'getDuesInformation'
}).query;
