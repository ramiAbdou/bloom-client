import { mutation, query } from 'gql-query-builder';

// ## GET PAYMENT HISTORY

export const GET_PAYMENT_HISTORY = query({
  fields: [
    'id',
    { paymentMethod: ['brand', 'expirationDate', 'last4', 'zipCode'] }
  ],
  operation: 'getMember',
  variables: { populate: '[String!]' }
}).query;

// ## UPDATE AUTO RENEW

export interface UpdateAutoRenewArgs {
  status: boolean;
}

export const UPDATE_AUTO_RENEW = mutation({
  fields: ['id', 'autoRenew'],
  operation: 'updateAutoRenew',
  variables: { status: { required: true, type: 'Boolean' } }
}).query;
