import { query } from 'gql-query-builder';

// ## GET PAYMENT HISTORY

export const GET_PAYMENT_HISTORY = query({
  fields: [
    'id',
    { paymentMethod: ['brand', 'expirationDate', 'last4', 'zipCode'] }
  ],
  operation: 'getMember',
  variables: { populate: '[String!]' }
}).query;
