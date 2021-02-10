import { mutation, query } from 'gql-query-builder';

// ## CREATE SINGLE PAYMENT

export interface CreateLifetimePaymentArgs {
  memberTypeId: string;
}

export const CREATE_LIFETIME_PAYMENT = mutation({
  fields: [
    'amount',
    'createdAt',
    'id',
    { member: ['id', 'autoRenew', 'isDuesActive', { type: ['id', 'name'] }] }
  ],
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
  isDuesActive: boolean;
  type: { id: string; name: string };
}

export const CREATE_SUBSCRIPTION = mutation({
  fields: [
    'amount',
    'createdAt',
    'id',
    { member: ['id', 'autoRenew', 'isDuesActive', { type: ['id', 'name'] }] }
  ],
  operation: 'createSubscription',
  variables: {
    autoRenew: { required: false, type: 'Boolean' },
    memberTypeId: { required: true }
  }
}).query;

// ## GET CHANGE PREVIEW

export interface GetChangePreviewArgs {
  memberTypeId: string;
}

export interface GetChangePreviewResult {
  amount: number;
  prorationDate: number;
}

export const GET_CHANGE_PREVIEW = query({
  fields: ['amount', 'prorationDate'],
  operation: 'getChangePreview',
  variables: { memberTypeId: { required: true } }
}).query;

// ## GET PAYMENT INTEGRATIONS

export const GET_PAYMENT_INTEGRATIONS = query({
  fields: ['id', 'stripeAccountId', { community: ['id'] }],
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
