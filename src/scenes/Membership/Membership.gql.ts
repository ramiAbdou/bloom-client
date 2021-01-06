import { query } from 'gql-query-builder';

export const GET_PAYMENT_HISTORY = query({
  fields: [
    'id',
    { paymentMethod: ['brand', 'expirationDate', 'last4', 'zipCode'] }
  ],
  operation: 'getMember',
  variables: { populate: '[String!]' }
}).query;
