import { mutation } from 'gql-query-builder';

export const CHARGE_PAYMENT = mutation({
  operation: 'chargePayment',
  variables: { id: { required: true }, idempotencyKey: { required: true } }
}).query;
