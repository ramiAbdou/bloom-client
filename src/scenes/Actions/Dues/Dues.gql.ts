import { mutation } from 'gql-query-builder';

export const GET_PAYMENT_CLIENT_SECRET = mutation({
  operation: 'getPaymentClientSecret'
}).query;
