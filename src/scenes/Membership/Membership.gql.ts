import { query } from 'gql-query-builder';

export const GET_PAYMENT_METHOD = query({
  fields: ['brand', 'expirationDate', 'last4', 'zipCode'],
  operation: 'getPaymentMethod'
}).query;
