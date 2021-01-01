import { mutation, query } from 'gql-query-builder';

export const GET_PAYMENT_METHOD = query({
  fields: [
    'id',
    { paymentMethod: ['brand', 'expirationDate', 'last4', 'zipCode'] }
  ],
  operation: 'getMember'
}).query;

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
