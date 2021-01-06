import { mutation, query } from 'gql-query-builder';

import { IMemberType } from '@store/entities';

// ## CREATE SUBSCRIPTION

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

// ## GET DUES INFORMATION

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

// ## GET PAYMENT METHOD

export const GET_PAYMENT_METHOD = query({
  fields: [
    'id',
    { paymentMethod: ['brand', 'expirationDate', 'last4', 'zipCode'] }
  ],
  operation: 'getMember'
}).query;

// ## UPDATE PAYMENT METHOD

export interface UpdatePaymentMethodArgs {
  paymentMethodId: string;
}

export const UPDATE_PAYMENT_METHOD = mutation({
  fields: [
    'id',
    { paymentMethod: ['brand', 'expirationDate', 'last4', 'zipCode'] }
  ],
  operation: 'updatePaymentMethod',
  variables: { paymentMethodId: { required: true } }
}).query;
