import { mutation, query } from 'gql-query-builder';

// ## CREATE SINGLE PAYMENT

export interface CreateLifetimePaymentArgs {
  memberTypeId: string;
}

export const CREATE_LIFETIME_PAYMENT = mutation({
  fields: ['id', 'autoRenew', 'duesStatus', { type: ['id', 'name'] }],
  operation: 'createLifetimePayment',
  variables: { memberTypeId: { required: true } }
}).query;

// ## CREATE SUBSCRIPTION

export interface CreateSubscriptionArgs {
  autoRenew?: boolean;
  memberTypeId: string;
  prorationDate?: number;
}

export interface CreateSubscriptionResult {
  id: string;
  duesStatus: string;
  type: { id: string; name: string };
}

export const CREATE_SUBSCRIPTION = mutation({
  fields: ['id', 'autoRenew', 'duesStatus', { type: ['id', 'name'] }],
  operation: 'createSubscription',
  variables: {
    autoRenew: { required: false, type: 'Boolean' },
    memberTypeId: { required: true }
  }
}).query;

// ## GET CHANGE PREVIEW

export const GET_CHANGE_PREVIEW = query({
  fields: ['amount', 'prorationDate'],
  operation: 'getChangePreview',
  variables: { memberTypeId: { required: true } }
}).query;

// ## GET PAYMENT INTEGRATIONS

export const GET_PAYMENT_INTEGRATIONS = query({
  fields: [
    'id',
    { integrations: ['id', 'stripeAccountId'] },
    { types: ['id', 'amount', 'isFree', 'name', 'recurrence'] }
  ],
  operation: 'getIntegrations'
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
